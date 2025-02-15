import { useNavigate } from "react-router";

export default function UrlDelivery() {
  const navigate = useNavigate();

  const handleBackMain = () => {
    navigate(`/`);
  }

  return (
    <div className="w-full h-screen bg-cyan-100">
      <div className="w-[680px] mx-auto my-0">
        <div>
          이미지 URL 제공 페이지 입니다.
        </div>
        <div className="text-right">
          <button
            className="bg-indigo-800 rounded-md px-4 py-1 text-white"
            onClick={handleBackMain}
          >
            메인으로
          </button>          
        </div>
      </div>
    </div>
  );
}
