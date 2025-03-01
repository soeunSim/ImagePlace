import {
  faCircleQuestion,
  faCropSimple,
  faPlus,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import useLodingStore from "../store/useLodingStore";
import CropModal from "./CropModal";
import HowToUseModal from "./HowToUseModal";
import ToolTip from "./ToolTip";

export default function ImageUpload() {
  const { setIsLoding } = useLodingStore();
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [isShowCropModal, setIsShowCropModal] = useState(false);
  const [isShowHowToUseModal, setIsShowHowToModal] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const IMAGE_DECREASE_CONDITION_SIZE = 2 * 1024 * 1024;
  const navigate = useNavigate();
  const fileCheck = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectFile(file);
      return;
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

  const reduceImageVolume = async (file, quality = 0.7) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    const result = await new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("이미지 압축 결과 : 실패"));
            }
          },
          file.type,
          quality
        );
      };
      image.onerror = () => reject(new Error("이미지 로드 결과 : 실패"));
    });
    return result;
  };

  const handleUrlDelivery = async (fileArg) => {
    const fileToUpload = selectFile || fileArg;

    if (!fileToUpload) {
      console.error("selectFile, null or undefined");
      return;
    }

    setIsLoding(true);

    try {
      const compressedReduceImage =
        fileToUpload.size > IMAGE_DECREASE_CONDITION_SIZE
          ? await reduceImageVolume(fileToUpload, 0.7)
          : fileToUpload;

      const payload = {
        fileName: fileToUpload.name,
        fileType: fileToUpload.type,
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
        throw new Error("pre-signed URL 요청 결과 : 실패");
      }

      const { uploadUrl, savedItem } = await presignResponse.json();

      const putOptions = {
        method: "PUT",
        headers: {
          "Content-Type": fileToUpload.type,
        },
        body: compressedReduceImage,
      };

      const uploadResponse = await fetch(uploadUrl, putOptions, savedItem);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("S3 업로드 결과 : 실패, 응답:", errorText);
        throw new Error("S3 업로드 결과 : 실패");
      }

      navigate(`/delivery/${savedItem.id}`);
    } catch (error) {
      console.error("파일 업로드 결과 : 에러", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectFile) {
      setIsShowToolTip(true);
      return;
    } else {
      setIsDragOver(true);
    }
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragADropImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      setSelectFile(file);
      handleUrlDelivery(file);

      return;
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];

    if (file) {
      setSelectFile(file);
      setIsDragOver(false);

      handleUrlDelivery(file);
      return;
    }
  };

  const handleShowHowToUse = () => {
    setIsShowHowToModal(true);
  };

  return (
    <div
      className="relative w-full h-screen bg-mainBackcolor flex flex-col justify-center"
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className="w-[700px] mx-auto my-0 animate-fadein">
        <h1 className="text-center flex flex-col items-center relative">
          <img
            className="w-[150px]"
            src={`/images/logo_01.png`}
            alt="로고 이미지"
          />
          <span className="inline-block text-6xl title pt-3">ImagePlace</span>
        </h1>
        <div className="mt-[20px]">
          <div className="text-right text-sm flex items-center justify-end mb-2">
            <button
              className="inline-block bg-pointLogo rounded-full px-3 py-1 text-white text-sm border border-pointLogo hover:bg-white hover:text-pointLogo"
              onClick={handleShowHowToUse}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
              <span className="ps-1">이용안내</span>
            </button>
          </div>
          <div className="flex items-center bg-pointGray rounded-xl overflow-hidden relative">
            <div className="flex w-1/2 px-8 py-8 bg-gradient-to-bl from-pointLogo to-purple-500 ">
              <label
                className={`inline-block mx-auto my-0 rounded-md text-center border-dashed border-2
                  px-5 py-4 text-white text-sm cursor-pointer hover:bg-subBlue duration-200
                    ${isDragOver ? "bg-subBlue" : "bg-transparent"}
                  `}
                onDragOver={handleDragOver}
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleDragADropImageChange}
                />
                <FontAwesomeIcon
                  className="text-2xl pb-1"
                  icon={faUpload}
                />
                <p className="">클릭 또는 파일을 이곳에 드롭하세요.</p>
                <p className="">png, jpg, jpeg 첨부가능</p>
              </label>
            </div>
            <div className="flex w-1/2 flex-col px-8 py-8 relative ">
              <label
                className="rounded-md flex-1 w-full px-4 py-2 bg-pointGray mb-3 shadow-opacity9 inline-block cursor-pointer duration-200 hover:bg-pointLightGray"
                htmlFor="upLoadFile"
              >
                <input
                  id="upLoadFile"
                  className=" file:hidden text-white text-sm min-w-1 cursor-pointer"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  ref={fileCheck}
                  onChange={handleImageChange}
                />
              </label>
              <div className="flex justify-between">
                <button
                  className="bg-pointLogo rounded-md px-4 py-1 text-white flex-1 duration-200 hover:text-pointLogo hover:bg-white"
                  onClick={handleShowModal}
                >
                  <FontAwesomeIcon icon={faCropSimple} />
                  <span className="text-sm"> 자르기</span>
                </button>
                <button
                  className="bg-pointBlue rounded-md px-4 py-1 ms-2 flex-1 text-white duration-200 hover:text-pointBlue hover:bg-white"
                  onClick={() => handleUrlDelivery()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span className="text-sm"> URL 생성하기</span>
                </button>
              </div>
            </div>
            {isShowToolTip ? (
              <ToolTip
                isShowToolTip={isShowToolTip}
                onClickHandleEvent={handleCloseToolTip}
                icon={FontAwesomeIcon}
                message={`우측 파일 등록창을 비워주세요.`}
              ></ToolTip>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="h-[20px]"></div>
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
      {isShowHowToUseModal ? (
        <HowToUseModal closeHowToModal={setIsShowHowToModal} />
      ) : (
        ""
      )}
    </div>
  );
}
