import { useEffect, useRef, useState } from "react";
import Plane from "./Plane";
import { gsap } from "gsap";
import { useThree } from "@react-three/fiber";

const Gallery = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
}) => {
  const ref = useRef();
  const { viewport } = useThree();
  const [isActive, setIsActive] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(null);
    }
  }, [activePlane]);

  useEffect(() => {
    gsap.killTweensOf(ref.current.position);
    gsap.to(ref.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: "elastic.inOut(1, 0.65)",
      delay: isActive ? 0 : 2,
    });
  }, [isActive]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (!isActive) return;
    setActivePlane(null);
    setIsActive(false);
  };

  return (
    <group ref={ref} onClick={() => setActivePlane(index)}>
      <Plane
        width={width}
        height={height}
        active={isActive}
        texture={item.image}
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

export default Gallery;
