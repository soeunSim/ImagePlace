import { faCropSimple, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import ToolTip from "./ToolTip";

export default function ImageUpload({ setPageID, pageId }) {
  const [isShowToolTip, setIsShowToolTip] = useState(false);

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

    }
  };

  const handleCloseToolTip = () => {
    setIsShowToolTip(false);
  };

  const handleUrlDelivery = () => {
    if (fileCheck.current.value === "") {    
      return ;
    } else {
      const newPageId = Date.now();

      navigate(`/delivery/${newPageId} + ${pageId}`);
      setPageID(pageId + 1);  
    }
  };

  return (
    <div className="w-[680px] mx-auto my-0">
      <h1 className="text-center flex flex-col items-center">
        <img
          className="w-[150px]"
          src={`./public/images/logo.png`}
          alt="로고 이미지"
        />
        <span className="inline-block text-6xl">ImagePlace</span>
      </h1>
      <div className="flex mt-[30px] font-bold relative">
        <input
          className="border-2 border-slate-700 shadow-md rounded-md font-bold 
          block text-sm text-slate-500 flex-1 bg-white
          file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm 
          file:font-semibold file:bg-black file:text-white
          hover:file:bg-slate-800"
          type="file"
          accept=".png,.jpg,.jpeg"
          ref={fileCheck}
          onChange={handleImageChange}
        />
        <button className="bg-blue-600 rounded-md px-4 py-1 mx-2 text-white">
          <FontAwesomeIcon icon={faCropSimple} />
        </button>
        <button 
          className="bg-indigo-800 rounded-md px-4 py-1 text-white"
          onClick={handleUrlDelivery}
        >
          URL 생성
        </button>
        {isShowToolTip && upFile? (
          <ToolTip
            isShowToolTip={isShowToolTip}
            onClickHandleEvent={handleCloseToolTip}
            toolTopicon={faXmark}
            message={"제한용량은 1MB입니다."}
          ></ToolTip>
        ) : (
          ""
        )}
      </div>
      <div className="h-[70px]"></div>
    </div>
  );
}
