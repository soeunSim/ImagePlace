import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLoadingStore from "../../hooks/useLoadingStore";
import ImageUploadView from "./ImageUploadView";

export default function ImageUploadContainer() {
  const { isLoading, setIsLoading } = useLoadingStore();
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [isShowCropModal, setIsShowCropModal] = useState(false);
  const [isShowHowToUseModal, setIsShowHowToModal] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const IMAGE_DECREASE_CONDITION_SIZE = 2 * 1024 * 1024;
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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

  const handleShowHowToUse = () => {
    setIsShowHowToModal(true);
  };
  const handleCloseHowToUse = () => {
    setIsShowHowToModal(false);
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
            if (blob) resolve(blob);
            else reject(new Error("이미지 압축 결과 : 실패"));
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

    setIsLoading(true);
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
        throw new Error(`Pre-signed URL 요청 실패: ${errorText}`);
      }
      const { uploadUrl, savedItem } = await presignResponse.json();

      const putOptions = {
        method: "PUT",
        headers: { "Content-Type": fileToUpload.type },
        body: compressedReduceImage,
      };
      const uploadResponse = await fetch(uploadUrl, putOptions);
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`S3 업로드 실패: ${errorText}`);
      }

      navigate(`/delivery/${savedItem.id}`);
    } catch (error) {
      console.error("파일 업로드 결과: 에러", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectFile) {
      setIsShowToolTip(true);
    } else {
      setIsDragOver(true);
    }
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectFile(file);
      setIsDragOver(false);
      handleUrlDelivery(file);
    }
  };

  const handleCropComplete = async (croppedBlobFromModal) => {
    await handleUrlDelivery(croppedBlobFromModal);
  };

  const viewProps = {
    isLoading,
    isShowToolTip,
    isShowCropModal,
    isShowHowToUseModal,
    selectFile,
    isDragOver,

    onSelectFile: handleImageChange,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDropFile: handleDrop,
    onShowCropModal: handleShowModal,
    onCloseCropModal: () => {
      setIsShowCropModal(false);
    },
    onCropComplete: handleCropComplete,
    onUrlDelivery: () => {
      handleUrlDelivery();
    },
    onShowHowToUse: handleShowHowToUse,
    onCloseToolTip: handleCloseToolTip,
    onCloseHowToUse: handleCloseHowToUse,
  };

  return <ImageUploadView {...viewProps} />;
}
