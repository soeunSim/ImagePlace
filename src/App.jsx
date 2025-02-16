import { useState } from "react";
import ImageUpload from "./component/ImageUpload";
import Loding from "./component/Loding";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full h-screen bg-mainBackcolor flex flex-col justify-center">
      {isLoading ? 
      <Loding />
      : 
      <ImageUpload setIsSLoading={setIsLoading} />      
      }
    </div>
  );
}

export default App;
