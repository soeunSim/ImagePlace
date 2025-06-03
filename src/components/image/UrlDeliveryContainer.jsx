import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import useLoadingStore from "../../hooks/useLoadingStore";
import UrlDeliveryView from "./UrlDeliveryView";

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

  const drawCanvas = (image) => {
    const canvas = deliveryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;
    const cssWidth = parent.clientWidth;
    const cssHeight = parent.clientHeight;

    const dpr = Math.min(window.devicePixelRatio, 3) || 1;

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let scaleFactor;
    if (image.width > cssWidth || image.height > cssHeight) {
      scaleFactor = Math.min(cssWidth / image.width, cssHeight / image.height);
    } else {
      scaleFactor = 1;
    }
    const drawnWidth = image.width * scaleFactor;
    const drawnHeight = image.height * scaleFactor;
    const offsetX = (cssWidth - drawnWidth) / 2;
    const offsetY = (cssHeight - drawnHeight) / 2;

    ctx.fillStyle = "#313131";
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      offsetX,
      offsetY,
      drawnWidth,
      drawnHeight
    );
  };

  useEffect(() => {
    if (!urlData) return;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = urlData.image_url;
    image.onload = () => {
      drawCanvas(image);
    };
  }, [urlData]);

  useEffect(() => {
    if (!urlData) return;

    const handleResize = () => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = urlData.image_url;
      image.onload = () => {
        drawCanvas(image);
      };
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const viewPropsOfUrlDelivery = {
    urlData,
    deliveryCanvasRef,

    onClickCopy: handleCopy,
    onClickReturnHome: handleBackMain,
  };

  return <UrlDeliveryView {...viewPropsOfUrlDelivery} />;
}
