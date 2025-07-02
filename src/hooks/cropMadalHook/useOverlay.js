import { useCallback, useEffect, useRef } from "react";

export function useOverlay(cropRect, handleSize, width, height) {
  const overlayCanvasRef = useRef(null);

  const drawOverlay = useCallback(() => {
    const canvas = overlayCanvasRef.current;

    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 3) || 1;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, width, height);

    ctx.clearRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(
      cropRect.x - handleSize / 2,
      cropRect.y - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropRect.x + cropRect.width - handleSize / 2,
      cropRect.y - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropRect.x - handleSize / 2,
      cropRect.y + cropRect.height - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      cropRect.x + cropRect.width - handleSize / 2,
      cropRect.y + cropRect.height - handleSize / 2,
      handleSize,
      handleSize
    );
  }, [cropRect, handleSize, width, height]);

  useEffect(() => {
    const canvas = overlayCanvasRef.current;

    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 3) || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawOverlay();
  }, [drawOverlay, width, height]);

  return overlayCanvasRef;
}
