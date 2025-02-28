import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function HowToUseModal() {
  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50">
      <div className="w-[700px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <div className="p-8">
          <p className="leading-7 text-xl">
            임시 저장 솔루션,
            <br />
            당신의 이미지를 철저하게 보호해드리는
          </p>
          <h2 className="text-xl">
            <span className="font-bold text-5xl pe-1">ImagePlace</span>에 오신
            것을 환영합니다!
          </h2>
          <p className="pt-5">아래는 간단한 이용 안내입니다.</p>
        </div>
        <div className="px-5">
          <UseInfo
            listNumber={"01"}
            listMessage={
              "메인화면 왼쪽의 드래그 앤 드롭 박스에 파일을 놓거나, 오른쪽 등록창을 통해 이미지 호스팅을 시작할 수 있습니다."
            }
          />
          <UseInfo
            listNumber={"02"}
            listMessage={`제공 된 URL은 발급일로부터 5일간 유효합니다. 단, 등록 당일은 유효기간에 포함되지 않습니다.`}
          />
          <UseInfo
            listNumber={"03"}
            listMessage={
              "URL 생성을 위한 페이지 또한 최초 발행 후 재접속이 가능합니다."
            }
          />
          <UseInfo
            listNumber={"04"}
            listMessage={
              "제공드린 URL 만료 기한이 지나지 않는 한 언제든지 재접속하여 확인할 수 있습니다."
            }
          />
          <p className="py-2">감사합니다. 😉</p>
        </div>
        <div className="flex justify-end p-5">
          <button className="flex items-center ms-1 text-sm rounded-md text-white px-3 py-[5px] bg-inFodanger">
            <FontAwesomeIcon icon={faXmark} />
            <span className="inline-block ps-1">닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function UseInfo({ listNumber, listMessage }) {
  return (
    <div className="flex items-baseline mb-2">
      <span className="px-2 py-1 text-white text-xs inline-block bg-pointLogo rounded-md me-2">
        {listNumber}
      </span>
      <p className="flex-1">{listMessage}</p>
    </div>
  );
}

UseInfo.propTypes = {
  listMessage: PropTypes.string.isRequired,
  listNumber: PropTypes.string.isRequired,
};
