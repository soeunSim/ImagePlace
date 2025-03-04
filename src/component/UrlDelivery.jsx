import {
  faClipboard,
  faHouse,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import useLoadingStore from "../store/useLoadingStore";

export default function UrlDelivery() {
  const [urlData, setUrlData] = useState(null);
  const { setIsLoading } = useLoadingStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const deliveryCanvasRef = useRef();

  useEffect(() => {
    if (!id) return;
    const getDataOfImageUrlInDB = async () => {
      try {
        const response = await fetch(
          `https://en8nts1hs2.execute-api.ap-northeast-2.amazonaws.com/get-url-data/delivery/${id}`
        );

        if (!response.ok) {
          throw new Error("네트워크 응답 오류");
        }
        const responseResult = await response.json();
        setUrlData(responseResult);
      } catch (err) {
        console.error(`요청을 가져올 수 없습니다: ${err}`);
      }
    };
    getDataOfImageUrlInDB();
    setIsLoading(false);
  }, [id, setIsLoading]);

  const CANVASWIDTH = 700;
  const CANVASHEIGHT = 400;

  useEffect(() => {
    if (!urlData) return;
    const showCanvas = deliveryCanvasRef.current;
    const context = showCanvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 3) || 1;

    showCanvas.width = CANVASWIDTH;
    showCanvas.height = CANVASHEIGHT;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = urlData.image_url;

    image.onload = () => {
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

      showCanvas.width = CANVASWIDTH * dpr;
      showCanvas.height = CANVASHEIGHT * dpr;
      context.scale(dpr, dpr);

      showCanvas.style.width = CANVASWIDTH + "px";
      showCanvas.style.height = CANVASHEIGHT + "px";

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
  }, [urlData]);

  const handleBackMain = () => {
    navigate(`/`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${urlData.page_url}`);
      alert("클립보드에 복사되었습니다!");
    } catch (error) {
      alert("복사에 실패했습니다: " + error);
    }
  };

  return (
    <div className="w-full h-screen bg-mainBackcolor">
      <div className="w-[700px] mx-auto my-0">
        <div className="pt-[2rem]">
          <h2 className="text-center title pb-4 text-4xl font-bold text-pointBlue">
            🎉URL creation completed!🎉
          </h2>
          {!urlData ? (
            <div className="w-full h-7 bg-inputColor rounded-md mb-2"></div>
          ) : (
            <div className="flex mb-2">
              <button
                className="w-[110px] bg-pointLogo px-2 me-2 text-white text-xs rounded-md"
                onClick={handleCopy}
              >
                <FontAwesomeIcon icon={faLink} /> PageUrl Copy
              </button>
              <input
                className="bg-pointGray rounded-md flex-1 text-xs text-white px-3 h-7"
                value={`${urlData.page_url}`}
                readOnly
              />
            </div>
          )}
          <div className="rounded-md overflow-hidden relative w-[700px] h-[400px]">
            <canvas
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 duration-200"
              ref={deliveryCanvasRef}
            ></canvas>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[698px] h-[400px] bg-pointGray rounded-md"></div>
          </div>
          <div className="mt-2">
            <div className="bg-pointBlue rounded-md text-sm text-white px-4 py-3 mb-2">
              {`⚠️ 등록하신 이미지 만료기간은 7일 입니다. `}
            </div>
            {!urlData ? (
              <>
                <SkeletonUrlList />
                <SkeletonUrlList />
                <SkeletonUrlList />
              </>
            ) : (
              <>
                <UrlList
                  labelMessage={`Image URL`}
                  inputValueType={`${urlData.image_url}`}
                />
                <UrlList
                  labelMessage={`Mark UP`}
                  inputValueType={`[Image](${urlData.image_url})`}
                />
                <UrlList
                  labelMessage={`HTML`}
                  inputValueType={`<a href="${urlData.image_url}" alt="Image">`}
                />
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <button
            className="bg-pointBlue font-bold rounded-md text-xs px-4 py-2 text-white"
            onClick={handleBackMain}
          >
            <FontAwesomeIcon icon={faHouse} />
            <span> 메인으로</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonUrlList() {
  return (
    <div className="pb-2 flex relative">
      <span className="w-[110px] h-[24px] me-2 text-center text-xs inline-block bg-inputColor font-bold rounded-md px-4 py-1 text-white"></span>
      <div className="h-[24px] bg-inputColor rounded-md flex-1 text-xs px-3"></div>
    </div>
  );
}

function UrlList({ labelMessage, inputValueType }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputValueType);
      alert("클립보드에 복사되었습니다!");
    } catch (error) {
      alert("복사에 실패했습니다: " + error);
    }
  };

  return (
    <div className="pb-2 flex relative">
      <label
        className={`w-[110px] me-2 text-center text-xs inline-block font-bold rounded-md px-4 py-1 text-white bg-pointGray`}
      >
        {labelMessage}
      </label>
      <input
        className="bg-inputColor rounded-md flex-1 text-xs px-3 pe-6 truncate"
        value={inputValueType}
        readOnly
      />
      <button
        className="absolute top-[4px] right-[10px] text-zinc-400 text-xs"
        onClick={handleCopy}
      >
        <FontAwesomeIcon icon={faClipboard} />
      </button>
    </div>
  );
}

UrlList.propTypes = {
  labelMessage: PropTypes.string.isRequired,
  inputValueType: PropTypes.string,
};
