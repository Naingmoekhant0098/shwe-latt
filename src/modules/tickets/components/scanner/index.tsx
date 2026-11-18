import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

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

  const onSuccessRef = useRef(scannSuccess);
  const setIsOpenRef = useRef(setIsOpen);
  onSuccessRef.current = scannSuccess;
  setIsOpenRef.current = setIsOpen;

  const handleClose = () => {
    setIsOpen(false);
    setStatus("idle");
  };

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    let handled = false;
    const scanner = new Html5Qrcode("qr-reader");

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
      try {
        const devices = await Html5Qrcode.getCameras();
        if (cancelled) return;

        if (!devices || devices.length === 0) {
          setStatus("error");
          return;
        }

        const backCamera = devices.find((d) => {
          const l = d.label.toLowerCase();
          return l.includes("back") || l.includes("environment") || l.includes("rear");
        });
        const cameraId = backCamera ? backCamera.id : devices[devices.length - 1].id;

        await scanner.start(
          cameraId,
          {
            fps: 20,
            qrbox: (width, height) => {
              const size = Math.min(width, height) * 0.65;
              return { width: size, height: size };
            },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (handled || cancelled) return;
            handled = true;

            const parts = decodedText.split("-");
            const ticketNumber = parts.length > 3 ? parts[3] : decodedText;

            onSuccessRef.current(ticketNumber);
            setIsOpenRef.current(false);
          },
          () => {}
        );

        if (!cancelled) setStatus("granted");
      } catch (error: any) {
        if (cancelled) return;
        console.error("Scanner Error:", error);
        const errStr = String(error).toLowerCase();
        setStatus(
          errStr.includes("notallowederror") || errStr.includes("permission denied")
            ? "denied"
            : "error"
        );
      }
    })();

    return () => {
      cancelled = true;
      startPromise.finally(safeStop);
    };
  }, [isOpen, attempt]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold">Scan Ticket QR</h2>
          <button
            onClick={handleClose}
            className="rounded-full bg-white/15 px-2.5 py-1 text-sm hover:bg-white/25"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-square w-full overflow-hidden bg-black">
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
        </div>

        <p className="px-4 py-3 text-center text-xs text-gray-400">
          Hold the phone 10–15 cm from the QR code
        </p>
      </div>
    </div>
  );
}