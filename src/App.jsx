import { Canvas } from "@react-three/fiber";
import Gallery from "./Gallery";
import Output from "./Gallery";

const App = () => {
  return (
    <>
      <Canvas>
        <Output />
      </Canvas>
    </>
  );
};

export default App;
