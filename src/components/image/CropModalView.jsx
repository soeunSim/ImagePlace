import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function CropModalView({
  baseCanvasRef,
  overlayCanvasRef,

  onCrop,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onCloseModal,
}) {
  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50">
      <div className="w-full sm:w-[700px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <div className={`relative w-[680px] h-[400px]`}>
          <canvas
            ref={baseCanvasRef}
            className="block"
          />
          <canvas
            ref={overlayCanvasRef}
            className="absolute top-0 left-0"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
        </div>
        <div className="p-5 flex justify-end">
          <ButtonOfCropModal
            btnBackgroundColor={`bg-pointBlue`}
            message={`URL 생성하기`}
            handleClick={onCrop}
          />
          <ButtonOfCropModal
            btnBackgroundColor={`bg-inFodanger`}
            message={`닫기`}
            handleClick={onCloseModal}
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

CropModalView.propTypes = {
  baseCanvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  overlayCanvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,

  onCrop: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

ButtonOfCropModal.propTypes = {
  message: PropTypes.string.isRequired,
  btnBackgroundColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
