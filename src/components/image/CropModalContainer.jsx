import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useImageLoader } from "../../hooks/cropMadalHook/useImageLoader";
import { useInitCanvas } from "../../hooks/cropMadalHook/useInitCanvas";
import { useOverlay } from "../../hooks/cropMadalHook/useOverlay";
import { getHandleUnderMouse } from "../../utils/cropUtils";
import CropModalView from "./CropModalView";

const CANVASWIDTH = 700;
const CANVASHEIGHT = 400;
const HANDLE_SIZE = 10;
const MIN_CROP_SIZE = 50;

export default function CropModal({
  selectFile,
  setIsLoading,
  setIsShowCropModal,
}) {
  const [cropRect, setCropRect] = useState(null);
  const [activeHandle, setActiveHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState(null);

  const alertShownRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 690 && !alertShownRef.current) {
      alertShownRef.current = true;
      alert("모바일에서는 크롭 기능을 지원하지 않습니다. PC에서 이용해주세요.");
      setIsShowCropModal(false);
    }
  }, [setIsShowCropModal]);

  const imageSrc = useImageLoader(selectFile);
  const { baseCanvasRef, originalImageRef, recodeParamsRef } = useInitCanvas(
    imageSrc,
    CANVASWIDTH,
    CANVASHEIGHT,
    setCropRect
  );
  const overlayCanvasRef = useOverlay(
    cropRect || { x: 0, y: 0, width: 0, height: 0 },
    HANDLE_SIZE,
    CANVASWIDTH,
    CANVASHEIGHT
  );

  const handleMouseDown = (event) => {
    const rect = overlayCanvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const handle = getHandleUnderMouse(cropRect, mouseX, mouseY, HANDLE_SIZE);
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
    if (!activeHandle || !resizeStart) {
      return;
    }
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

    if (newRect.width < MIN_CROP_SIZE) {
      newRect.width = MIN_CROP_SIZE;
    }
    if (newRect.height < MIN_CROP_SIZE) {
      newRect.height = MIN_CROP_SIZE;
    }

    const { offsetX, offsetY, imageWidth, imageHeight, scaleFactor } =
      recodeParamsRef.current;

    const drawnWidth = imageWidth * scaleFactor;
    const drawnHeight = imageHeight * scaleFactor;

    let left = newRect.x;
    let top = newRect.y;
    let right = newRect.x + newRect.width;
    let bottom = newRect.y + newRect.height;

    const minX = offsetX;
    const maxX = offsetX + drawnWidth;
    left = Math.max(left, minX);
    right = Math.min(right, maxX);

    const minY = offsetY;
    const maxY = offsetY + drawnHeight;
    top = Math.max(top, minY);
    bottom = Math.min(bottom, maxY);

    if (right - left < MIN_CROP_SIZE) {
      right = left + MIN_CROP_SIZE;
      right = Math.min(right, maxX);
      left = right - MIN_CROP_SIZE;
    }
    if (bottom - top < MIN_CROP_SIZE) {
      bottom = top + MIN_CROP_SIZE;
      bottom = Math.min(bottom, maxY);
      top = bottom - MIN_CROP_SIZE;
    }

    newRect.x = left;
    newRect.y = top;
    newRect.width = right - left;
    newRect.height = bottom - top;

    setCropRect(newRect);
  };

  const handleMouseUp = () => {
    setActiveHandle(null);
    setResizeStart(null);
  };

  const handleCrop = async () => {
    if (!originalImageRef.current) {
      return;
    }
    const { scaleFactor, offsetX, offsetY } = recodeParamsRef.current;
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
        alert("이미지 처리에 실패했습니다.");
        return;
      }
      try {
        setIsLoading(true);
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
          alert("서버와 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
          alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");
          throw new Error("S3 업로드 실패");
        }

        navigate(`/delivery/${savedItem.id}`);
      } catch (error) {
        console.error("파일 업로드 에러:", error);
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }, "image/png");
  };

  const handleCloseModal = () => {
    setIsShowCropModal(false);
  };

  const viewProps = {
    baseCanvasRef,
    overlayCanvasRef,

    onCrop: handleCrop,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onCloseModal: handleCloseModal,
  };

  return <CropModalView {...viewProps} />;
}

CropModal.propTypes = {
  selectFile: PropTypes.object,
  setIsLoading: PropTypes.func.isRequired,
  setIsShowCropModal: PropTypes.func,
};
