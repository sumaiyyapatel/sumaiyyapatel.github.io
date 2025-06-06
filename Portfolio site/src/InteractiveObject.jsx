import React from 'react';
import * as THREE from 'three';

export default function InteractiveObject({ object, sectionKey, onClick }) {
  return (
    <group>
      {/* Clickable mesh */}
      <mesh
        geometry={object.geometry}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={(e) => {
          e.stopPropagation();
          onClick(sectionKey);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <meshStandardMaterial transparent opacity={0.1} />
      </mesh>

      {/* Glow mesh */}
      <mesh
        geometry={object.geometry}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale.clone().multiplyScalar(1.05)}
      >
        <meshBasicMaterial
          color="lime"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
