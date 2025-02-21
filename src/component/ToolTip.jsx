import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function ToolTip({
  isShowToolTip,
  onClickHandleEvent,
  icon: Icon,
  message,
}) {
  return (
    <div
      className={
        isShowToolTip
          ? "flex justify-between text-xl rounded-2xl text-white absolute w-[550px] px-6 py-[30px] bg-inFodanger transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          : "none"
      }
    >
      <span>{message}</span>
      <button
        className="text-2xl"
        onClick={onClickHandleEvent}
      >
        <Icon icon={faXmark} />
      </button>
    </div>
  );
}

ToolTip.propTypes = {
  isShowToolTip: PropTypes.bool.isRequired,
  onClickHandleEvent: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  message: PropTypes.string.isRequired,
};
