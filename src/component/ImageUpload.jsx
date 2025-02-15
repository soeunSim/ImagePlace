import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImageUpload() {
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
      <div className="flex mt-[30px] font-bold">
        <input
          className="border-2 border-slate-700 shadow-md rounded-md font-bold 
          block text-sm text-slate-500 flex-1 bg-white
        file:mr-4 file:py-2 file:px-4
        file:border-0 file:text-sm file:font-semibold
        file:bg-black file:text-white
        hover:file:bg-slate-800"
          type="file"
        />
        <button className="bg-blue-600 rounded-md px-4 py-1 mx-2 text-white">
          <FontAwesomeIcon icon={faCropSimple} />
        </button>
        <button className="bg-indigo-800 rounded-md px-4 py-1 text-white">
          URL 생성
        </button>
      </div>
      <div className="h-[70px]"></div>
    </div>
  );
}
