import { faCropSimple, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import ToolTip from "./ToolTip";
import  AWS  from  'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export default function ImageUpload({ setPageID, pageId ,setIsLoading }) {
  const [isShowToolTip, setIsShowToolTip] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [countID, setCountID] = useState(0);

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
      setSelectFile(file);
    }
  };
  console.log(selectFile);

  const handleCloseToolTip = () => {
    setIsShowToolTip(false);
  };

  const handleUrlDelivery = () => {
    if (fileCheck.current.value === "") {    
      return ;
    } else if (selectFile) {
        setIsLoading(true);

        AWS.config.update({
          accessKeyId: import.meta.env.VITE_PUBLIC_S3_ACCESSKEYID , 
          secretAccessKey: import.meta.env.VITE_PUBLIC_S3_SECRETACCESSKEY, 
          region: import.meta.env.VITE_PUBLIC_S3_REGION , 
        });
        
        const s3 = new AWS.S3(); 

        const fileExtension = selectFile.name.split('.').pop();
        const newFileName = `${uuidv4()}.${fileExtension}`;

        const renamedFile = new File([selectFile], newFileName, { type: selectFile.type });

        const uploadParams = {
          Bucket: 'imgplace-load', 
          Key: `upload/${renamedFile.name}`,
          Body: renamedFile,
        };

        s3.upload(uploadParams, (err, data) => {
          if (err) {
            console.error('Error uploading', err);
          } else {
            setIsLoading(false);
            const newPageId = Date.now();

            navigate(`/delivery/${newPageId} + ${pageId}`);
            setPageID(`${pageId}` + countID );   
            setCountID(countID + 1);      
          }
        });       
    }
  };

  return (
    <div className="w-[680px] mx-auto my-0 animate-fadein">
      <h1 className="text-center flex flex-col items-center">
        <img
          className="w-[150px]"
          src={`./public/images/logo.png`}
          alt="로고 이미지"
        />
        <span className="inline-block text-6xl title">ImagePlace</span>
      </h1>
      <div className="flex mt-[30px] font-bold relative">
        <input
          className="border-2 border-pointGray shadow-md rounded-md font-bold 
          block text-sm text-slate-500 flex-1 bg-white
          file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm 
          file:font-semibold file:bg-pointGray file:text-white
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
          className="bg-pointBlue rounded-md px-4 py-1 text-white"
          onClick={handleUrlDelivery}
        >
          URL 생성
        </button>
        {isShowToolTip ? (
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
