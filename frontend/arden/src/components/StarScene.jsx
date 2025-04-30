// StarScene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CentralSphere from "./CentralSphere";
import VortexParticles from "./VortexParticles";

const StarScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <CentralSphere />
      <VortexParticles />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default StarScene;
