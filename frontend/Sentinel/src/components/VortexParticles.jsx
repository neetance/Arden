// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// const vertexShader = `
//   uniform float uTime;
//   attribute float aScale;

//   void main() {
//     vec3 pos = position;

//     float angle = atan(pos.y, pos.x);
//     float radius = length(pos.xy);
//     angle += uTime * 0.25;

//     pos.x = cos(angle) * radius;
//     pos.y = sin(angle) * radius;

//     vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
//     gl_Position = projectionMatrix * modelViewPosition;
//     gl_PointSize = aScale * 3.5;
//     gl_PointSize *= (300.0 / -modelViewPosition.z);
//   }
// `;

// const fragmentShader = `
//   void main() {
//     float strength = distance(gl_PointCoord, vec2(0.5));
//     strength = 1.0 - strength;
//     gl_FragColor = vec4(vec3(0.4, 0.8, 1.0), strength); // cosmic blue
//   }
// `;

// const VortexParticles = ({ count = 600 }) => {
//   const meshRef = useRef();
//   const positions = new Float32Array(count * 3);
//   const scales = new Float32Array(count);

//   for (let i = 0; i < count; i++) {
//     const i3 = i * 3;
//     const r = Math.random() * 6 + 2;
//     const angle = Math.random() * Math.PI * 2;

//     positions[i3 + 0] = Math.cos(angle) * r;
//     positions[i3 + 1] = Math.sin(angle) * r;
//     positions[i3 + 2] = (Math.random() - 0.5) * 2;

//     scales[i] = Math.random();
//   }

//   const shaderMaterial = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     transparent: true,
//     uniforms: {
//       uTime: { value: 0 },
//     },
//     blending: THREE.AdditiveBlending,
//     depthWrite: false,
//   });

//   useFrame((state) => {
//     shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
//   });

//   return (
//     <points ref={meshRef} material={shaderMaterial}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-aScale"
//           count={scales.length}
//           array={scales}
//           itemSize={1}
//         />
//       </bufferGeometry>
//     </points>
//   );
// };

// export default VortexParticles;
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex Shader
const vertexShader = `
  uniform float uTime;
  attribute float aScale;

  void main() {
    vec3 pos = position;

    float angle = atan(pos.y, pos.x);
    float radius = length(pos.xy);
    angle += uTime * 0.25;

    pos.x = cos(angle) * radius;
    pos.y = sin(angle) * radius;

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = aScale * 3.5;
    gl_PointSize *= (300.0 / -modelViewPosition.z);
  }
`;

// Fragment Shader (SHARP PARTICLES, no blur)
const fragmentShader = `
  precision mediump float;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));

    // Option 1: Sharp circular particles
    if (dist > 0.5) discard;
    gl_FragColor = vec4(0.4, 0.8, 1.0, 1.0);

    // Option 2: Uncomment below for square particles (no discard)
    // gl_FragColor = vec4(0.4, 0.8, 1.0, 1.0);
  }
`;

const VortexParticles = ({ count = 200 }) => {
  const meshRef = useRef();

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * 6 + 2;
      const angle = Math.random() * Math.PI * 2;

      positions[i3 + 0] = Math.cos(angle) * r;
      positions[i3 + 1] = Math.sin(angle) * r;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;

      scales[i] = Math.random();
    }

    return { positions, scales };
  }, [count]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

export default VortexParticles;
