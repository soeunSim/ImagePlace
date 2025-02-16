import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UrlDelivery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const deliveryCanvasRef = useRef();

  const CANVASWIDTH = 680; 
  const CANVASHEIGHT = 400; 

  useEffect(() => {
    const showCanvas = deliveryCanvasRef.current;
    const context = showCanvas.getContext('2d');
    const dpr = window.devicePixelRatio; 

    showCanvas.width = CANVASWIDTH;
    showCanvas.height = CANVASHEIGHT;

    context.fillStyle = "#313131";
    context.fillRect(0,0,CANVASWIDTH, CANVASHEIGHT); 
  }, [])

  const handleBackMain = () => {
    navigate(`/`);
  }


  return (
    <div className="w-full h-screen bg-mainBackcolor">
      <div className="w-[680px] mx-auto my-0">
        <div className="pt-[1.8rem]">
          <h2 className="text-center pb-4 text-4xl font-bold text-pointBlue">
            URL creation completed!
          </h2>
          <div className="rounded-md overflow-hidden">
            <canvas ref={deliveryCanvasRef}></canvas>
          </div>
          <div
            className="mt-2"
          >
            <div
              className="bg-pointBlue rounded-md text-sm text-white px-5 py-3 mb-2"
            >현재 발급 된 Page URL 주소를 기억해야 재 방문이 가능합니다.</div>
            <UrlList labelMessage={`Page URL`} inputValueType={ `${id}` } />
            <UrlList labelMessage={`URL`} />
            <UrlList labelMessage={`Mark UP`} />
          </div>
        </div>
        <div className="text-right pt-3">
          <button
            className="bg-pointBlue font-bold rounded-md px-4 py-1 text-white"
            onClick={handleBackMain}
          >
            메인으로
          </button>          
        </div>
      </div>
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

  return(
    <div 
      className="pb-2 flex relative"
    >
      <label 
        className="w-[100px] me-2 text-center text-sm inline-block bg-pointGray font-bold rounded-md px-4 py-1 text-white"
      >
        {labelMessage}
      </label>
      <input 
        className="bg-inputColor rounded-md flex-1"
        value={inputValueType}
        readOnly
      />
      <button 
        className="absolute right-[10px] text-zinc-400"
        onClick={() => handleCopy(inputValueType)}
      >
        <FontAwesomeIcon icon={faClipboard} />
      </button>
    </div>
  );
}
