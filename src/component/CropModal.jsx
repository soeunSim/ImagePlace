import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CANVASWIDTH = 680;
const CANVASHEIGHT = 400;
const HANDLE_SIZE = 10;
const MIN_CROP_SIZE = 50;

export default function CropModal({
  selectFile,
  setIsLoding,
  setIsShowCropModal,
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropRect, setCropRect] = useState({
    x: 100,
    y: 50,
    width: 200,
    height: 150,
  });
  const [recodeParams, setRecodeParams] = useState({
    scaleFactor: 1,
    offsetX: 0,
    offsetY: 0,
    imageWidth: 0,
    imageHeight: 0,
  });
  const [activeHandle, setActiveHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState(null);
  const baseCanvasRef = useRef(null);
  const originalImageRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const didInitRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(selectFile);
    }
  }, [selectFile]);

  const drawOverlay = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 3) || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

    ctx.clearRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(
      cropRect.x - HANDLE_SIZE / 2,
      cropRect.y - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.fillRect(
      cropRect.x + cropRect.width - HANDLE_SIZE / 2,
      cropRect.y - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.fillRect(
      cropRect.x - HANDLE_SIZE / 2,
      cropRect.y + cropRect.height - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.fillRect(
      cropRect.x + cropRect.width - HANDLE_SIZE / 2,
      cropRect.y + cropRect.height - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
  }, [cropRect.x, cropRect.y, cropRect.width, cropRect.height]);

  useEffect(() => {
    if (!imageSrc || didInitRef.current) return;
    const baseCanvas = baseCanvasRef.current;
    const ctx = baseCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    baseCanvas.width = CANVASWIDTH * dpr;
    baseCanvas.height = CANVASHEIGHT * dpr;

    ctx.scale(dpr, dpr);

    baseCanvas.style.width = `${CANVASWIDTH}px`;
    baseCanvas.style.height = `${CANVASHEIGHT}px`;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageSrc;
    originalImageRef.current = image;

    image.onload = () => {
      const iw = image.width;
      const ih = image.height;

      let scaleFactor;
      if (iw > CANVASWIDTH || ih > CANVASHEIGHT) {
        scaleFactor = iw > ih ? CANVASWIDTH / iw : CANVASHEIGHT / ih;
      } else {
        scaleFactor = 1;
      }
      const drawnWidth = iw * scaleFactor;
      const drawnHeight = ih * scaleFactor;
      const offsetX = (CANVASWIDTH - drawnWidth) / 2;
      const offsetY = (CANVASHEIGHT - drawnHeight) / 2;

      ctx.fillStyle = "#313131";
      ctx.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
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
        width: Math.min(200, drawnWidth - 40),
        height: Math.min(150, drawnHeight - 40),
      });
      setRecodeParams({
        scaleFactor,
        offsetX,
        offsetY,
        imageWidth: iw,
        imageHeight: ih,
      });

      const overlayCanvas = overlayCanvasRef.current;
      const overlayCtx = overlayCanvas.getContext("2d");

      overlayCanvas.width = CANVASWIDTH * dpr;
      overlayCanvas.height = CANVASHEIGHT * dpr;

      overlayCtx.scale(dpr, dpr);

      overlayCanvas.style.width = `${CANVASWIDTH}px`;
      overlayCanvas.style.height = `${CANVASHEIGHT}px`;

      drawOverlay();
      didInitRef.current = true;
    };
  }, [imageSrc, drawOverlay]);

  useEffect(() => {
    drawOverlay();
  }, [drawOverlay]);

  const getHandleUnderMouse = (mouseX, mouseY) => {
    if (
      mouseX >= cropRect.x - HANDLE_SIZE / 2 &&
      mouseX <= cropRect.x + HANDLE_SIZE / 2 &&
      mouseY >= cropRect.y - HANDLE_SIZE / 2 &&
      mouseY <= cropRect.y + HANDLE_SIZE / 2
    )
      return "tl";
    if (
      mouseX >= cropRect.x + cropRect.width - HANDLE_SIZE / 2 &&
      mouseX <= cropRect.x + cropRect.width + HANDLE_SIZE / 2 &&
      mouseY >= cropRect.y - HANDLE_SIZE / 2 &&
      mouseY <= cropRect.y + HANDLE_SIZE / 2
    )
      return "tr";
    if (
      mouseX >= cropRect.x - HANDLE_SIZE / 2 &&
      mouseX <= cropRect.x + HANDLE_SIZE / 2 &&
      mouseY >= cropRect.y + cropRect.height - HANDLE_SIZE / 2 &&
      mouseY <= cropRect.y + cropRect.height + HANDLE_SIZE / 2
    )
      return "bl";
    if (
      mouseX >= cropRect.x + cropRect.width - HANDLE_SIZE / 2 &&
      mouseX <= cropRect.x + cropRect.width + HANDLE_SIZE / 2 &&
      mouseY >= cropRect.y + cropRect.height - HANDLE_SIZE / 2 &&
      mouseY <= cropRect.y + cropRect.height + HANDLE_SIZE / 2
    )
      return "br";
    return null;
  };

  const handleMouseDown = (event) => {
    const rect = overlayCanvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const handle = getHandleUnderMouse(mouseX, mouseY);
    if (handle) {
      setActiveHandle(handle);
      setResizeStart({
        mouseX,
        mouseY,
        cropRect: { ...cropRect },
      });
    }
  };

  const handleMouseMove = (event) => {
    if (!activeHandle || !resizeStart) return;
    const rect = overlayCanvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const deltaX = mouseX - resizeStart.mouseX;
    const deltaY = mouseY - resizeStart.mouseY;
    let newRect = { ...resizeStart.cropRect };

    switch (activeHandle) {
      case "tl":
        newRect.x = resizeStart.cropRect.x + deltaX;
        newRect.y = resizeStart.cropRect.y + deltaY;
        newRect.width = resizeStart.cropRect.width - deltaX;
        newRect.height = resizeStart.cropRect.height - deltaY;
        break;
      case "tr":
        newRect.y = resizeStart.cropRect.y + deltaY;
        newRect.width = resizeStart.cropRect.width + deltaX;
        newRect.height = resizeStart.cropRect.height - deltaY;
        break;
      case "bl":
        newRect.x = resizeStart.cropRect.x + deltaX;
        newRect.width = resizeStart.cropRect.width - deltaX;
        newRect.height = resizeStart.cropRect.height + deltaY;
        break;
      case "br":
        newRect.width = resizeStart.cropRect.width + deltaX;
        newRect.height = resizeStart.cropRect.height + deltaY;
        break;
      default:
        break;
    }

    if (newRect.width < MIN_CROP_SIZE) newRect.width = MIN_CROP_SIZE;
    if (newRect.height < MIN_CROP_SIZE) newRect.height = MIN_CROP_SIZE;
    if (newRect.x < 0) {
      newRect.width += newRect.x;
      newRect.x = 0;
    }
    if (newRect.y < 0) {
      newRect.height += newRect.y;
      newRect.y = 0;
    }
    if (newRect.x + newRect.width > CANVASWIDTH) {
      newRect.width = CANVASWIDTH - newRect.x;
    }
    if (newRect.y + newRect.height > CANVASHEIGHT) {
      newRect.height = CANVASHEIGHT - newRect.y;
    }

    setCropRect(newRect);
  };

  const handleMouseUp = () => {
    setActiveHandle(null);
    setResizeStart(null);
  };

  const handleCrop = async () => {
    if (!originalImageRef.current) return;
    const { scaleFactor, offsetX, offsetY } = recodeParams;
    const originalX = Math.floor((cropRect.x - offsetX) / scaleFactor);
    const originalY = Math.floor((cropRect.y - offsetY) / scaleFactor);
    const originalWidth = Math.floor(cropRect.width / scaleFactor);
    const originalHeight = Math.floor(cropRect.height / scaleFactor);

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = originalWidth;
    cropCanvas.height = originalHeight;
    const cropCtx = cropCanvas.getContext("2d");
    cropCtx.drawImage(
      originalImageRef.current,
      originalX,
      originalY,
      originalWidth,
      originalHeight,
      0,
      0,
      originalWidth,
      originalHeight
    );

    cropCanvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Blob 생성 실패");
        return;
      }
      try {
        setIsLoding(true);
        const payload = {
          fileName: selectFile.name.replace(/\.[^/.]+$/, ".png"),
          fileType: "image/png",
        };

        const presignResponse = await fetch(
          "https://r97e0i6ui6.execute-api.ap-northeast-2.amazonaws.com/this-api/change",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!presignResponse.ok) {
          const errorText = await presignResponse.text();
          console.error("Pre-signed URL 요청 실패:", errorText);
          throw new Error("pre-signed URL 요청 실패");
        }

        const { uploadUrl, savedItem } = await presignResponse.json();

        const putOptions = {
          method: "PUT",
          headers: { "Content-Type": "image/png" },
          body: blob,
        };

        const uploadResponse = await fetch(uploadUrl, putOptions);
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("S3 업로드 실패, 응답:", errorText);
          throw new Error("S3 업로드 실패");
        }

        navigate(`/delivery/${savedItem.id}`);
      } catch (error) {
        console.error("파일 업로드 에러:", error);
      }
    }, "image/png");
  };

  const handelCloseModal = () => {
    setIsShowCropModal(false);
  };

  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50">
      <div className="w-[680px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <div className={`relative w-[680px] h-[400px]`}>
          <canvas
            ref={baseCanvasRef}
            className="block"
          />
          <canvas
            ref={overlayCanvasRef}
            className={`absolute top-0 left-0`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
        <div className="p-5 flex justify-end">
          <ButtonOfCropModal
            btnBackgroundColor={`bg-pointBlue`}
            message={`URL 생성하기`}
            handleClick={handleCrop}
          />
          <ButtonOfCropModal
            btnBackgroundColor={`bg-inFodanger`}
            message={`닫기`}
            handleClick={handelCloseModal}
          />
        </div>
      </div>
    </div>
  );
}

function ButtonOfCropModal({ message, btnBackgroundColor, handleClick }) {
  return (
    <button
      className={`flex items-center ms-1 text-sm rounded-md text-white px-3 py-[5px] ${btnBackgroundColor}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center h-4 w-4">
        <FontAwesomeIcon
          icon={message === "닫기" ? faXmark : faPlus}
          className="h-3 w-3"
        />
      </div>
      <span className="inline-block self-center">{message}</span>
    </button>
  );
}

CropModal.propTypes = {
  selectFile: PropTypes.object,
  setIsLoding: PropTypes.func.isRequired,
  setIsShowCropModal: PropTypes.func,
};

ButtonOfCropModal.propTypes = {
  message: PropTypes.string.isRequired,
  btnBackgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
