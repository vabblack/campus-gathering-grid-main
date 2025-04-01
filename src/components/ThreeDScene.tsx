import React from 'react';
import { Octahedron } from '@react-three/drei';

const ThreeDScene: React.FC = () => {
  return (
    <Octahedron args={[1, 0]}>
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.8}
        wireframe
      />
    </Octahedron>
  );
};

export default ThreeDScene; 