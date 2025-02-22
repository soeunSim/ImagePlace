import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function CropModal({ setIsShowCropMadal }) {
  const cropCanvasRef = useRef();

  const handelCloseModal = () => {
    setIsShowCropMadal(false);
  };
  useEffect(() => {}, []);

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
  setIsShowCropMadal: PropTypes.func,
};

ButtonOfCropModal.propTypes = {
  message: PropTypes.string.isRequired,
  btnBackgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
