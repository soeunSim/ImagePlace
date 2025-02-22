import ImageUpload from "./component/ImageUpload";
import Loding from "./component/Loding";
import useLodingStore from "./store/useLodingStore";

function App() {
  const { isLoding } = useLodingStore();

  return <div>{isLoding ? <Loding /> : <ImageUpload />}</div>;
}

export default App;
