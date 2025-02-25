import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const CANVASWIDTH = 680;
const CANVASHEIGHT = 400;

export default function CropModal({ selectFile, setIsShowCropModal }) {
  const [imageSrc, setImageSrc] = useState(null);
  const baseCanvasRef = useRef(null);
  const originalImageRef = useRef(null);
  const didInitRef = useRef(false);

  useEffect(() => {
    if (selectFile) {
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target.result);
      reader.readAsDataURL(selectFile);
    }
  }, [selectFile]);

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
      const iw = image.width,
        ih = image.height;
      let scaleFactor = 1;
      if (iw > CANVASWIDTH || ih > CANVASHEIGHT) {
        scaleFactor = iw > ih ? CANVASWIDTH / iw : CANVASHEIGHT / ih;
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

      didInitRef.current = true;
    };
  }, [imageSrc]);

  const handelCloseModal = () => {
    setIsShowCropModal(false);
  };

  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50">
      <div className="w-[680px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <canvas ref={baseCanvasRef}></canvas>
        <div className="p-5 flex justify-end">
          <ButtonOfCropModal
            btnBackgroundColor={`bg-pointLogo`}
            message={`자르기`}
          />
          <ButtonOfCropModal
            btnBackgroundColor={`bg-pointBlue`}
            message={`URL 생성하기`}
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
      className={`inline-block ms-1 rounded-md text-white px-2 py-1 ${btnBackgroundColor}`}
      onClick={handleClick}
    >
      {message}
    </button>
  );
}

CropModal.propTypes = {
  selectFile: PropTypes.object,
  setIsShowCropModal: PropTypes.func,
};

ButtonOfCropModal.propTypes = {
  message: PropTypes.string.isRequired,
  btnBackgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
