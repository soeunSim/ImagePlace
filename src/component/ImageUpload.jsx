import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import useLodingStore from "../store/useLodingStore";
import CropModal from "./CropModal";
import ToolTip from "./ToolTip";

export default function ImageUpload() {
  const { setIsLoding } = useLodingStore();
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [isShowCropModal, setIsShowCropModal] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const IMAGE_MAX_SIZE = 1 * 1024 * 1024;
  const navigate = useNavigate();
  const fileCheck = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const target = event.currentTarget;

    if (file.size > IMAGE_MAX_SIZE) {
      setIsShowToolTip(true);
      target.value = "";
      return;
    } else if (file && file.size < IMAGE_MAX_SIZE) {
      setSelectFile(file);
    }
  };

  const handleCloseToolTip = () => {
    setIsShowToolTip(false);
  };

  const handleShowModal = () => {
    if (!selectFile) {
      alert("파일을 등록해주세요.");
    } else {
      setIsShowCropModal(true);
    }
  };

  const handleUrlDelivery = async () => {
    if (!selectFile) {
      console.error("selectFile, null or undefined");
      return;
    }

    setIsLoding(true);

    try {
      const payload = {
        fileName: selectFile.name,
        fileType: selectFile.type,
      };

      const presignResponse = await fetch(
        "https://r97e0i6ui6.execute-api.ap-northeast-2.amazonaws.com/this-api/change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!presignResponse.ok) {
        const errorText = await presignResponse.text();
        console.error("Pre-signed URL request failed / response:", errorText);
        throw new Error("pre-signed URL 요청 실패");
      }

      const { uploadUrl, savedItem } = await presignResponse.json();

      const putOptions = {
        method: "PUT",
        headers: {
          "Content-Type": selectFile.type,
        },
        body: selectFile,
      };

      const uploadResponse = await fetch(uploadUrl, putOptions, savedItem);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("S3 업로드 실패, 응답:", errorText);
        throw new Error("S3 업로드 실패");
      }

      navigate(`/delivery/${savedItem.id}`);
    } catch (error) {
      console.error("파일 업로드 에러:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-mainBackcolor flex flex-col justify-center">
      <div className="w-[680px] mx-auto my-0 animate-fadein">
        <h1 className="text-center flex flex-col items-center relative">
          <img
            className="w-[150px]"
            src={`/images/logo_01.png`}
            alt="로고 이미지"
          />
          <span className="inline-block text-6xl title pt-3">ImagePlace</span>
        </h1>
        <div className="flex mt-[30px] font-bold relative">
          <input
            className="border-2 border-pointGray shadow-md rounded-md font-bold 
            block text-sm text-slate-500 flex-1 bg-white
            file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm 
            file:font-semibold file:bg-pointGray file:text-white
            hover:file:bg-slate-800"
            type="file"
            accept=".png,.jpg,.jpeg"
            ref={fileCheck}
            onChange={handleImageChange}
          />
          <button
            className="bg-pointLogo rounded-md px-4 py-1 mx-2 text-white"
            onClick={handleShowModal}
          >
            <FontAwesomeIcon icon={faCropSimple} />
          </button>
          <button
            className="bg-pointBlue rounded-md px-4 py-1 text-white hover:bg-hoverBlue"
            onClick={handleUrlDelivery}
          >
            URL 생성
          </button>
          {isShowToolTip ? (
            <ToolTip
              isShowToolTip={isShowToolTip}
              onClickHandleEvent={handleCloseToolTip}
              icon={FontAwesomeIcon}
              message={"제한용량은 1MB입니다."}
            ></ToolTip>
          ) : (
            ""
          )}
        </div>
        <div className="h-[70px]"></div>
      </div>
      {isShowCropModal ? (
        <CropModal
          selectFile={selectFile}
          setIsLoding={setIsLoding}
          setIsShowCropModal={setIsShowCropModal}
        />
      ) : (
        ""
      )}
    </div>
  );
}
