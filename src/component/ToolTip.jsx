import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToolTip({
  isShowToolTip,
  onClickHandleEvent,
  toolTopicon,
  message,
}) {
  return (
    <div
      className={
        isShowToolTip
          ? "flex justify-between rounded-md text-white absolute w-[500px] px-5 py-[30px] bg-red-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          : "none"
      }
    >
      <span>{message}</span>
      <button onClick={onClickHandleEvent}>
        <FontAwesomeIcon icon={toolTopicon} />
      </button>
    </div>
  );
}
