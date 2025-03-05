import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function HowToUseModal({ closeHowToModal }) {
  const handleCloseHowToUseModal = () => {
    closeHowToModal(false);
  };

  return (
    <div className="absolute w-full h-dvh left-0 bg-gray-950/50 animate-opacity duration-100">
      <div className="w-[700px] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-md">
        <div className="p-9">
          <p className="leading-7 text-xl">
            임시 저장 솔루션,
            <br />
            당신의 이미지를 철저하게 보호해드리는
          </p>
          <h2 className="text-xl">
            <span className="font-bold text-5xl pe-1">ImagePlace</span>에 오신
            것을 환영합니다!
          </h2>
        </div>
        <div className="px-9">
          <p className="bg-sky-100 font-bold text-pointLogo rounded-md p-3 mb-4 text-sm">
            💡 imagePlace는 단기 저장형, 이미지 호스팅 서비스 입니다.
          </p>
          <UseInfo
            listNumber={"01"}
            listMessage={
              "메인화면 왼쪽의 드래그 앤 드롭 박스에 파일을 놓거나, 오른쪽 등록창을 통해 이미지 호스팅을 시작할 수 있습니다."
            }
          />
          <UseInfo
            listNumber={"02"}
            listMessage={`등록하신 이미지는 7일간 유효합니다.`}
          />
          <UseInfo
            listNumber={"03"}
            listMessage={
              "제공 드린 URL 페이지의 경우 최초 발행 시에만 주소를 알려드리는 점 참고부탁드립니다."
            }
          />
          <UseInfo
            listNumber={"04"}
            listMessage={
              "URL 만료 기한이 지나지 않는 한 제공 페이지는 언제든지 재접속 가능합니다."
            }
          />
        </div>
        <div className="flex justify-between items-center px-8 pt-3 pb-8">
          <span className="text-sm text-slate-400">imagePlace v.1.0</span>
          <button className="flex items-center ms-1 text-sm rounded-md text-white px-3 py-[5px] bg-inFodanger">
            <FontAwesomeIcon icon={faXmark} />
            <span
              className="inline-block ps-1"
              onClick={handleCloseHowToUseModal}
            >
              닫기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function UseInfo({ listNumber, listMessage }) {
  return (
    <div className="flex items-baseline mb-3">
      <span className="px-[5px] py-[3px] items-center text-white text-xs inline-block bg-pointLogo rounded-md me-3">
        {listNumber}
      </span>
      <p className="flex-1">{listMessage}</p>
    </div>
  );
}

HowToUseModal.propTypes = {
  closeHowToModal: PropTypes.func.isRequired,
};

UseInfo.propTypes = {
  listMessage: PropTypes.string.isRequired,
  listNumber: PropTypes.string.isRequired,
};
