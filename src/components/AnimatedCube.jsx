import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const RotatingCube = () => {
  const cubeRef = useRef();

  // Animating the cube rotation
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const AnimatedCube = () => {
  return (
    <Canvas style={{ height: "100vh", background: "#222" }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      {/* 3D Object */}
      <RotatingCube />
      {/* Controls to rotate the scene */}
      <OrbitControls />
    </Canvas>
  );
};

export default AnimatedCube;
