import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function CropModal({ selectFile, setIsShowCropMadal }) {
  const cropCanvasRef = useRef();
  const CANVASWIDTH = 680;
  const CANVASHEIGHT = 400;

  const handelCloseModal = () => {
    setIsShowCropMadal(false);
  };
  useEffect(() => {
    if (selectFile) {
      const image = new Image();
      const imageUrl = URL.createObjectURL(selectFile);
      image.src = imageUrl;

      image.onload = () => {
        drowCanvas(image);
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [selectFile]);

  const drowCanvas = (image) => {
    const Canvas = cropCanvasRef.current;
    const context = Canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 3) || 1;

    Canvas.width = CANVASWIDTH;
    Canvas.height = CANVASHEIGHT;

    const imageWidth = image.width;
    const imageHeight = image.height;

    let scaleFactor;
    if (imageWidth > CANVASWIDTH || imageHeight > CANVASHEIGHT) {
      scaleFactor =
        imageWidth > imageHeight
          ? CANVASWIDTH / imageWidth
          : CANVASHEIGHT / imageHeight;
    } else {
      scaleFactor = 1;
    }
    const drawnWidth = imageWidth * scaleFactor;
    const drawnHeight = imageHeight * scaleFactor;

    Canvas.width = CANVASWIDTH * dpr;
    Canvas.height = CANVASHEIGHT * dpr;
    context.scale(dpr, dpr);

    Canvas.style.width = CANVASWIDTH + "px";
    Canvas.style.height = CANVASHEIGHT + "px";

    const offsetX = (CANVASWIDTH - drawnWidth) / 2;
    const offsetY = (CANVASHEIGHT - drawnHeight) / 2;

    context.fillStyle = "#313131";
    context.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    context.drawImage(
      image,
      0,
      0,
      imageWidth,
      imageHeight,
      offsetX,
      offsetY,
      drawnWidth,
      drawnHeight
    );
  };

  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50">
      <div className="w-[680px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <canvas ref={cropCanvasRef}></canvas>
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
  setIsShowCropMadal: PropTypes.func,
};

ButtonOfCropModal.propTypes = {
  message: PropTypes.string.isRequired,
  btnBackgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
