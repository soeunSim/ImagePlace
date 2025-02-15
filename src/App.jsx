import { useState } from "react";
import ImageUpload from "./component/Imageupload";

function App() {
  const [pageId, setPageID] = useState(1);

  return (
    <div className="w-full h-screen bg-cyan-100 flex flex-col justify-center">
      <ImageUpload setPageID={setPageID} pageId={pageId} />
    </div>
  );
}

export default App;
