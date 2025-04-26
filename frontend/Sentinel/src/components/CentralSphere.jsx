import React from "react";
import { Sphere } from "@react-three/drei";

const CentralSphere = () => {
  return (
    <Sphere args={[1.2, 64, 64]}>
      <meshStandardMaterial
        emissive="#6b63ff"
        emissiveIntensity={1.5}
        color="#120f29"
      />
    </Sphere>
  );
};

export default CentralSphere;
