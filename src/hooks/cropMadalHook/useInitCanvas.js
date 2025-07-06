import { useEffect, useRef } from "react";

export function useInitCanvas(imageSrc, width, height, setCropRect) {
  const baseCanvasRef = useRef(null);
  const originalImageRef = useRef(null);
  const didInitRef = useRef(false);

  const recodeParamsRef = useRef({
    scaleFactor: 1,
    offsetX: 0,
    offsetY: 0,
    imageWidth: 0,
    imageHeight: 0,
  });

  useEffect(() => {
    if (!imageSrc || didInitRef.current) {
      return;
    }
    const baseCanvas = baseCanvasRef.current;
    const ctx = baseCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    baseCanvas.width = width * dpr;
    baseCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    baseCanvas.style.width = `${width}px`;
    baseCanvas.style.height = `${height}px`;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageSrc;
    originalImageRef.current = image;

    image.onload = () => {
      const iw = image.width;
      const ih = image.height;

      let scaleFactor;
      if (iw > width || ih > height) {
        scaleFactor = iw > ih ? width / iw : height / ih;
      } else {
        scaleFactor = 1;
      }
      const drawnWidth = iw * scaleFactor;
      const drawnHeight = ih * scaleFactor;
      const offsetX = (width - drawnWidth) / 2;
      const offsetY = (height - drawnHeight) / 2;

      ctx.fillStyle = "#313131";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(
        image,
        0,
        0,
        iw,
        ih,
        offsetX,
        offsetY,
        drawnWidth,
        drawnHeight
      );

      setCropRect({
        x: offsetX + 20,
        y: offsetY + 20,
        width: Math.max(50, drawnWidth - 40),
        height: Math.max(50, drawnHeight - 40),
      });

      recodeParamsRef.current = {
        scaleFactor,
        offsetX,
        offsetY,
        imageWidth: iw,
        imageHeight: ih,
      };

      didInitRef.current = true;
    };
  }, [imageSrc, width, height, setCropRect]);

  return {
    baseCanvasRef,
    originalImageRef,
    recodeParamsRef,
  };
}
