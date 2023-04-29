import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import PhotoShader from "./shader/PhotoShader.glsl";
import PhotoFragment from "./shader/PhotoFragment.glsl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Plane = ({ width, height, texture, active, ...props }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const ImgTexture = useTexture(texture);

  useEffect(() => {
    if (ref.current.material) {
      ref.current.material.uniforms.uZoomScale.value.x = viewport.width / width;
      ref.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height;

      gsap.to(ref.current.material.uniforms.uProgress, {
        value: active ? 1 : 0,
        duration: 2.5,
        ease: "elastic.inOut(1, 0.65)",
      });

      gsap.to(ref.current.material.uniforms.uResolution.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
        duration: 2.5,
        ease: "elastic.inOut(1, 0.65)",
      });
    }
  }, [viewport, active]);

  const PhotoMaterial = shaderMaterial(
    {
      uTexture: ImgTexture,
      uResolution: { x: 1, y: 1 },
      uImageResolution: {
        x: ImgTexture.source.data.width,
        y: ImgTexture.source.data.height,
      },
      uZoomScale: { x: 1, y: 1 },
      uProgress: 0,
    },
    PhotoShader,
    PhotoFragment
  );
  extend({ PhotoMaterial });

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[width, height]} />
      <photoMaterial />
    </mesh>
  );
};

export default Plane;
