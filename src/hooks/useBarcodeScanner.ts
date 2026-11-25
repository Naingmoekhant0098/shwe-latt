import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
  minLength?: number;
  maxDelay?: number;    // max ms between keystrokes inside one scan
  endTimeout?: number;  // ms of silence that marks the scan as finished
  ignoreInputs?: boolean; // ignore keystrokes typed inside inputs
};

export function useBarcodeScanner(
  onScan: (code: string) => void,
  {
    enabled = true,
    minLength = 3,
    maxDelay = 50,
    endTimeout = 100,
    ignoreInputs = true,
  }: Options = {}
) {
  const buffer = useRef("");
  const lastTime = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callback = useRef(onScan);
  callback.current = onScan;

  useEffect(() => {
    if (!enabled) return;

    const finish = () => {
      if (buffer.current.length >= minLength) {
        callback.current(buffer.current);
      }
      buffer.current = "";
    };

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (ignoreInputs && (tag === "INPUT" || tag === "TEXTAREA")) return;

      const now = Date.now();
      if (now - lastTime.current > maxDelay) buffer.current = "";
      lastTime.current = now;

      if (e.key === "Enter") {
        clearTimeout(timer.current);
        if (buffer.current.length >= minLength) e.preventDefault();
        finish();
        return;
      }

      if (e.key.length === 1) {
        buffer.current += e.key;
        clearTimeout(timer.current);
        timer.current = setTimeout(finish, endTimeout);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timer.current);
    };
  }, [enabled, minLength, maxDelay, endTimeout, ignoreInputs]);
}