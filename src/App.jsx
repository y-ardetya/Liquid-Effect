import { Canvas } from "@react-three/fiber";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <>
      <Canvas>
        <Carousel />
      </Canvas>
    </>
  );
};

export default App;
