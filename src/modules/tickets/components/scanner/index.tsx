import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const QR_BOX = 180; // px - small scan area for tiny lottery QR codes
const DEFAULT_ZOOM = 2; // starting zoom (only if the phone supports it)

type ZoomCaps = { min: number; max: number; step: number };

export default function Scanner({
  isOpen,
  setIsOpen,
  scannSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  scannSuccess: (value: string) => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "requesting" | "granted" | "denied" | "error"
  >("idle");
  const [attempt, setAttempt] = useState(0);
  const [zoomCaps, setZoomCaps] = useState<ZoomCaps | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const onSuccessRef = useRef(scannSuccess);
  const setIsOpenRef = useRef(setIsOpen);
  onSuccessRef.current = scannSuccess;
  setIsOpenRef.current = setIsOpen;

  const handleClose = () => {
    setIsOpen(false);
    setStatus("idle");
  };

  const applyZoom = async (value: number) => {
    setZoom(value);
    try {
      await scannerRef.current?.applyVideoConstraints({
        advanced: [{ zoom: value }],
      } as any);
    } catch (e) {
      console.warn("Zoom failed:", e);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    let handled = false;

    const scanner = new Html5Qrcode("qr-reader", {
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });
    scannerRef.current = scanner;

    const safeStop = async () => {
      try {
        if (scanner.isScanning) await scanner.stop();
        scanner.clear();
      } catch (e) {
        console.warn("Scanner stop error:", e);
      }
    };

    const startPromise = (async () => {
      setStatus("requesting");
      setZoomCaps(null);
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 15,
            qrbox: { width: QR_BOX, height: QR_BOX },
            videoConstraints: {
              facingMode: "environment",
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
          } as any,
          (decodedText: string) => {
            if (handled || cancelled) return;
            handled = true;

            const parts = decodedText.split("-");
            const ticketNumber = parts.length > 3 ? parts[3] : decodedText;

            onSuccessRef.current(ticketNumber);
            setIsOpenRef.current(false);
          },
          () => {}
        );

        if (cancelled) return;
        setStatus("granted");

        // continuous autofocus + zoom slider (if the phone supports them)
        try {
          const caps: any = scanner.getRunningTrackCapabilities();
          const advanced: any[] = [];

          if (caps?.focusMode?.includes?.("continuous")) {
            advanced.push({ focusMode: "continuous" });
          }
          if (caps?.zoom) {
            const min = caps.zoom.min ?? 1;
            const max = caps.zoom.max ?? 1;
            const step = caps.zoom.step || 0.1;
            const start = Math.min(Math.max(DEFAULT_ZOOM, min), max);
            setZoomCaps({ min, max, step });
            setZoom(start);
            advanced.push({ zoom: start });
          }
          if (advanced.length) {
            await scanner.applyVideoConstraints({ advanced } as any);
          }
        } catch (e) {
          console.warn("Could not apply focus/zoom:", e);
        }
      } catch (error: any) {
        if (cancelled) return;
        console.error("Scanner Error:", error);
        const errStr = String(error).toLowerCase();
        setStatus(
          errStr.includes("notallowederror") ||
            errStr.includes("permission denied")
            ? "denied"
            : "error"
        );
      }
    })();

    return () => {
      cancelled = true;
      startPromise.finally(() => {
        safeStop();
        if (scannerRef.current === scanner) scannerRef.current = null;
      });
    };
  }, [isOpen, attempt]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold">Scan Ticket QR</h2>
          <button
            onClick={handleClose}
            className="rounded-full bg-white/15 px-2.5 py-1 text-sm hover:bg-white/25"
          >
            ✕
          </button>
        </div>

        {/* camera area (small, square) */}
        <div className="relative mx-auto aspect-square w-full bg-black overflow-hidden">
          <div
            id="qr-reader"
            className="h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
          />

          {status === "requesting" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-center">
              <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <p className="text-sm">Requesting camera...</p>
            </div>
          )}

          {status === "denied" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black p-4 text-center">
              <span className="text-3xl">🔒</span>
              <p className="mt-2 text-sm text-red-400">Camera access blocked</p>
              <p className="mt-1 text-xs text-gray-400">
                Allow the camera in your browser settings, then retry.
              </p>
              <button
                onClick={() => setAttempt((n) => n + 1)}
                className="mt-3 rounded-lg bg-red-600 px-4 py-1.5 text-sm hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black p-4 text-center">
              <span className="text-3xl">⚠️</span>
              <p className="mt-2 text-sm text-amber-400">Camera setup failed</p>
              <p className="mt-1 text-xs text-gray-400">
                Close other apps using the camera. HTTPS is required.
              </p>
              <button
                onClick={() => setAttempt((n) => n + 1)}
                className="mt-3 rounded-lg bg-amber-600 px-4 py-1.5 text-sm hover:bg-amber-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* laser inside the small scan box */}
          {status === "granted" && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div
                className="relative"
                style={{ width: QR_BOX, height: QR_BOX }}
              >
                <div className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[laserMove_2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}
        </div>

        {/* zoom slider */}
        <div className="px-4 py-3">
          {zoomCaps ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Zoom</span>
              <input
                type="range"
                min={zoomCaps.min}
                max={zoomCaps.max}
                step={zoomCaps.step}
                value={zoom}
                onChange={(e) => applyZoom(Number(e.target.value))}
                className="h-1 flex-1 accent-cyan-400"
              />
              <span className="w-10 text-right text-xs text-gray-300">
                {zoom.toFixed(1)}x
              </span>
            </div>
          ) : (
            <p className="text-center text-xs text-gray-400">
              Hold the phone 10–15 cm from the QR code
            </p>
          )}
        </div>
      </div>
    </div>
  );
}