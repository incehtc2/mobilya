"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#EDE7D9" wireframe />
    </mesh>
  );
}

export function ProductViewer3D({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full aspect-square bg-cream-dark">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Suspense fallback={<LoadingBox />}>
          <Model url={modelUrl} />
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.3}
            scale={8}
            blur={2}
          />
        </Suspense>

        <OrbitControls
          enableZoom
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
