import ImageUpload from "./component/ImageUpload";
import Loading from "./component/Loading";
import useLoadingStore from "./store/useLoadingStore";

function App() {
  const { isLoading } = useLoadingStore();

  return <div>{isLoading ? <Loading /> : <ImageUpload />}</div>;
}

export default App;
