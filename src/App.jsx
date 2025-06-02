import ImageUpload from "./components/ImageUpload";
import Loading from "./components/Loading";
import useLoadingStore from "./hooks/useLoadingStore";

function App() {
  const { isLoading } = useLoadingStore();

  return <div>{isLoading ? <Loading /> : <ImageUpload />}</div>;
}

export default App;
