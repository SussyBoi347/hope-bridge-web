import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';

function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function AnimatedBox({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} args={[1.2, 1.2, 1.2]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
      />
    </Box>
  );
}

function AnimatedTorus({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.2}
        speed={2}
        roughness={0.3}
        metalness={0.7}
      />
    </Torus>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        
        <AnimatedSphere position={[-3, 2, 0]} color="#3B82F6" speed={0.8} />
        <AnimatedBox position={[3, -1, -1]} color="#60A5FA" speed={1.2} />
        <AnimatedTorus position={[2, 2, -2]} color="#2563EB" speed={1} />
        <AnimatedSphere position={[-2, -2, -1]} color="#1D4ED8" speed={0.6} />
        <AnimatedBox position={[0, 3, -3]} color="#93C5FD" speed={0.9} />
      </Canvas>
    </div>
  );
}