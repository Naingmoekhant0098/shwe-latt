import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
export default function Scanner({ isOpen, setIsOpen, scannSuccess, }) {
    // const [isOpen, setIsOpen] = useState(false);
    const [scanResult, setScanResult] = useState("");
    const [permissionStatus, setPermissionStatus] = useState("idle");
    const scannerRef = useRef(null);
    const handleClose = async () => {
        await stopScanner();
        setIsOpen(false);
        setPermissionStatus("idle");
    };
    const startScanner = async () => {
        let element = document.getElementById("qr-reader");
        if (!element) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            element = document.getElementById("qr-reader");
            if (!element)
                return;
        }
        setPermissionStatus("requesting");
        try {
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("qr-reader");
            }
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                setPermissionStatus("error");
                return;
            }
            setPermissionStatus("granted");
            const backCamera = devices.find((device) => device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("environment") ||
                device.label.toLowerCase().includes("rear"));
            const cameraId = backCamera ? backCamera.id : devices[0].id;
            await scannerRef.current.start(cameraId, {
                fps: 20,
                qrbox: (width, height) => {
                    const size = Math.min(width, height) * 0.65;
                    return { width: size, height: size };
                },
                aspectRatio: 1.0,
            }, (decodedText) => {
                const ticketNumber = decodedText.split("-")[3];
                scannSuccess(ticketNumber);
                handleClose();
            }, () => { });
        }
        catch (error) {
            console.error("Scanner Error:", error);
            const errStr = error.toString().toLowerCase();
            if (errStr.includes("notallowederror") ||
                errStr.includes("permission denied")) {
                setPermissionStatus("denied");
            }
            else {
                setPermissionStatus("error");
            }
        }
    };
    const stopScanner = async () => {
        try {
            if (scannerRef.current && scannerRef.current.isScanning) {
                await scannerRef.current.stop();
            }
        }
        catch (error) {
            console.error("Scanner Stop Error:", error);
        }
        finally {
            scannerRef.current = null;
        }
    };
    useEffect(() => {
        if (isOpen) {
            startScanner();
        }
        else {
            stopScanner();
        }
        return () => {
            stopScanner();
        };
    }, [isOpen]);
    return (_jsx("div", { className: "", children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex flex-col bg-black text-white select-none", children: [_jsxs("div", { className: "absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent", children: [_jsx("h2", { className: "text-lg font-semibold", children: "QR Scanner" }), _jsx("button", { onClick: handleClose, className: "rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/30 z-40", children: "\u2715" })] }), _jsxs("div", { className: "relative flex-1 flex items-center justify-center w-full h-full", children: [permissionStatus !== "granted" && (_jsxs("div", { className: "absolute inset-0 z-20 flex items-center justify-center p-6 bg-black", children: [permissionStatus === "requesting" && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-lg font-medium", children: "Requesting Camera Access..." }), _jsx("p", { className: "text-sm text-gray-400 mt-2", children: "Please tap 'Allow' when prompted by your browser." })] })), permissionStatus === "denied" && (_jsxs("div", { className: "text-center max-w-sm bg-gray-900/90 p-6 rounded-2xl border border-red-500/30", children: [_jsx("span", { className: "text-4xl", children: "\uD83D\uDD12" }), _jsx("h3", { className: "text-xl font-semibold mt-4 text-red-400", children: "Camera Access Blocked" }), _jsxs("p", { className: "text-sm text-gray-400 mt-2 leading-relaxed", children: ["We need your camera to scan codes. Please click the lock icon in your browser's address bar to change permissions to ", _jsx("strong", { children: "Allow" }), ", then try again."] }), _jsx("button", { onClick: startScanner, className: "mt-5 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 px-4 font-medium transition", children: "Try Accessing Again" })] })), permissionStatus === "error" && (_jsxs("div", { className: "text-center max-w-sm bg-gray-900/90 p-6 rounded-2xl border border-amber-500/30", children: [_jsx("span", { className: "text-4xl", children: "\u26A0\uFE0F" }), _jsx("h3", { className: "text-xl font-semibold mt-4 text-amber-400", children: "Camera Setup Failed" }), _jsx("p", { className: "text-sm text-gray-400 mt-2 leading-relaxed", children: "Could not establish a video connection. Make sure no other apps are using your camera and that you are using a secure connection (HTTPS)." }), _jsx("button", { onClick: startScanner, className: "mt-5 w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-2 px-4 font-medium transition", children: "Retry Setup" })] }))] })), _jsxs("div", { className: "absolute inset-0 h-full w-full bg-black overflow-hidden", children: [_jsx("div", { id: "qr-reader", className: "h-full w-full [&_video]:object-cover [&_video]:h-full [&_video]:w-full [&_#qr-reader__scan_region]:!border-0" }), permissionStatus === "granted" && (_jsx("div", { className: "absolute inset-0 pointer-events-none z-10 flex items-center justify-center", children: _jsx("div", { className: "relative w-[65vmin] h-[65vmin] max-w-[400px] max-h-[400px]", children: _jsx("div", { className: "absolute left-0 right-0 h-[3px] bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_4px_#ffffff] animate-[laserMove_2.5s_ease-in-out_infinite]" }) }) }))] })] })] })) }));
}
