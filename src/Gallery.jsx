import { useEffect, useRef, useState } from "react";
import Plane from "./Plane";
import { gsap } from "gsap";
import { useThree } from "@react-three/fiber";
import k from "./assets/k.png";
import l from "./assets/l.png";
import h from "./assets/h1.jpg";

const Gallery = ({ image, position }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    gsap.killTweensOf(ref.current.position);
    gsap.to(ref.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: "rough",
      delay: isActive ? 0 : 2,
    });
  }, [isActive]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (!isActive) return;
    setIsActive(false);
  };

  return (
    <group ref={ref} onClick={() => setIsActive(true)}>
      <Plane
        width={2.5}
        height={6}
        active={isActive}
        texture={image}
        position={position}
      />

      {isActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} color={"red"} />
        </mesh>
      ) : null}
    </group>
  );
};

const Output = () => {
  return (
    <>
      <Gallery image={k} position={[0, 0, 0]} />
      <Gallery image={l} position={[-3, 0, 0]} />
      <Gallery image={h} position={[3, 0, 0]} />
    </>
  );
};

export default Output;
