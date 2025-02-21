//import { useState } from "react";
import ImageUpload from "./component/ImageUpload";
import Loding from "./component/Loding";
import useLodingStore from "./store/useLodingStore";

function App() {
  //const [isLoading, setIsLoading] = useState(false);
  const { isLoding } = useLodingStore();

  return (
    <div className="w-full h-screen bg-mainBackcolor flex flex-col justify-center">
      {isLoding ? <Loding /> : <ImageUpload />}
    </div>
  );
}

export default App;
