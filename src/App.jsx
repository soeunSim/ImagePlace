import Loading from "./components/common/Loading";
import ImageUpload from "./components/image/ImageUpload";
import useLoadingStore from "./hooks/useLoadingStore";

function App() {
  const { isLoading } = useLoadingStore();

  return <div>{isLoading ? <Loading /> : <ImageUpload />}</div>;
}

export default App;
