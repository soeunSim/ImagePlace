import {
  faCircleQuestion,
  faCropSimple,
  faPlus,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import HowToUseModal from "../common/HowToUseModal";
import Loading from "../common/Loading";
import ToolTip from "../common/ToolTip";
import CropModal from "./CropModal";

export default function ImageUploadView({
  isLoading,
  isShowToolTip,
  isShowCropModal,
  isShowHowToUseModal,
  selectFile,
  isDragOver,

  onSelectFile,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDropFile,
  onShowCropModal,
  onCloseCropModal,
  onCropComplete,
  onUrlDelivery,
  onShowHowToUse,
  onCloseToolTip,
  onCloseHowToUse,
}) {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="relative w-full h-screen bg-mainBackcolor flex flex-col justify-center"
      onDragOver={onDragOver}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="w-full sm:w-[700px] mx-auto my-0 animate-fadein px-5 sm:px-0">
        <h1 className="text-center flex flex-col items-center relative">
          <img
            className="w-[110px] sm:w-[150px]"
            src={`/images/logo_01.png`}
            alt="로고 이미지"
          />
          <span className="inline-block text-5xl sm:text-6xl title pt-3">
            ImagePlace
          </span>
        </h1>
        <div className="mt-[20px]">
          <div className="text-right text-sm flex items-center justify-end mb-2">
            <button
              className="inline-block bg-pointLogo rounded-full px-3 py-1 text-white text-xs sm:text-sm border border-pointLogo hover:bg-white hover:text-pointLogo"
              onClick={onShowHowToUse}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
              <span className="ps-1">이용안내</span>
            </button>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center bg-pointGray rounded-xl overflow-hidden relative">
            <div className="flex w-full sm:w-1/2 px-8 py-8 bg-gradient-to-bl from-pointLogo to-purple-500 ">
              <label
                className={`
                  inline-block mx-auto my-0 rounded-md text-center border-dashed border-2
                  px-5 py-4 text-white text-sm cursor-pointer hover:bg-subBlue duration-200
                  ${isDragOver ? "bg-subBlue" : "bg-transparent"}
                `}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDropFile}
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={onSelectFile}
                  data-testid="drag-drop-input"
                />
                <FontAwesomeIcon
                  className="text-2xl pb-1"
                  icon={faUpload}
                />
                <p className="text-xs sm:text-sm">
                  클릭 또는 파일을 이곳에 드롭하세요.
                </p>
                <p className="text-xs sm:text-sm">
                  png, jpg, jpeg, WEBP 첨부가능
                </p>
              </label>
            </div>

            <div className="flex w-full sm:w-1/2 flex-col px-8 py-8 relative ">
              <label
                className="rounded-md flex-1 w-full px-4 py-2 bg-pointGray mb-3 shadow-opacity9 inline-block cursor-pointer duration-200 hover:bg-pointLightGray"
                htmlFor="upLoadFile"
              >
                <input
                  id="upLoadFile"
                  className=" file:hidden text-white text-sm min-w-1 cursor-pointer"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={onSelectFile}
                  data-testid="file-upload-input"
                />
              </label>
              <div className="flex justify-between">
                <button
                  className="bg-pointLogo rounded-md py-1 text-white flex-1 duration-200 hover:text-pointLogo hover:bg-white flex items-center justify-center"
                  onClick={onShowCropModal}
                >
                  <FontAwesomeIcon icon={faCropSimple} />
                  <span className="text-xs sm:text-sm ms-1"> 자르기</span>
                </button>
                <button
                  className="bg-pointBlue rounded-md py-1 ms-2 flex-1 text-white duration-200 hover:text-pointBlue hover:bg-white flex items-center justify-center"
                  onClick={onUrlDelivery}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span className="text-xs sm:text-sm ms-1"> URL 생성하기</span>
                </button>
              </div>
            </div>

            {isShowToolTip && (
              <ToolTip
                isShowToolTip={isShowToolTip}
                onClickHandleEvent={onCloseToolTip}
                icon={FontAwesomeIcon}
                message="우측 파일 등록창을 비워주세요."
              />
            )}
          </div>
        </div>
        <div className="h-[20px]"></div>
      </div>

      {isShowCropModal && (
        <CropModal
          selectFile={selectFile}
          setIsLoading={onCropComplete}
          setIsShowCropModal={onCloseCropModal}
        />
      )}

      {isShowHowToUseModal && (
        <HowToUseModal closeHowToModal={onCloseHowToUse} />
      )}
    </div>
  );
}

ImageUploadView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isShowToolTip: PropTypes.bool.isRequired,
  isShowCropModal: PropTypes.bool.isRequired,
  isShowHowToUseModal: PropTypes.bool.isRequired,
  selectFile: PropTypes.instanceOf(File),
  isDragOver: PropTypes.bool.isRequired,

  onSelectFile: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDropFile: PropTypes.func.isRequired,
  onShowCropModal: PropTypes.func.isRequired,
  onCloseCropModal: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  onUrlDelivery: PropTypes.func.isRequired,
  onShowHowToUse: PropTypes.func.isRequired,
  onCloseToolTip: PropTypes.func.isRequired,
  onCloseHowToUse: PropTypes.func.isRequired,
};

ImageUploadView.defaultProps = {
  selectFile: null,
};
