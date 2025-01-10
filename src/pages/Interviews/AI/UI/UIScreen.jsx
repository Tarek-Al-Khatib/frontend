import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Experience } from "../Screen/Screen";

const CameraSetup = () => {
  const cameraRef = useRef();

  return (
    <group>
      {useFrame(({ camera }) => {
        camera.position.set(0, 1.5, 1.5);
        camera.lookAt(0, 1.5, 0);
      })}
    </group>
  );
};

const UI = () => {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 1.5, 2],
        fov: 30,
      }}
    >
      <CameraSetup />
      <Experience />
    </Canvas>
  );
};

export default UI;
