import { useGLTF, Html } from '@react-three/drei';
import { useEffect, useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useFrame } from '@react-three/fiber';
import Stats from 'three/examples/jsm/libs/stats.module';

export default function Room({ onObjectClick }) {
  const { scene } = useGLTF('/models/room.glb');
  const [interactiveMeshes, setInteractiveMeshes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const meshRefs = useRef([]);

  const clonedScene = useMemo(() => clone(scene), [scene]);


  useEffect(() => {
    if (!clonedScene) return;

    const ledMeshes = {
      'wall art': { color: '#00ffff', intensity: 0.6 },
      'Shelf': { color: '#ff69b4', intensity: 0.6 },
      'Cube.007': { color: '#00ffff', intensity: 0.5 },
      'Cube.006': { color: '#ff69b4', intensity: 0.5 },
      'Cube.004': { color: '#ff69b4', intensity: 0.5 },
      'Cube.003': { color: '#00ffff', intensity: 0.5 },
      'Sphere': { color: '#ffffff', intensity: 0.8 },
      'monitor_1_2': { color: '#ffffff', intensity: 0.9 },
      'monitor2_1': { color: '#ffffff', intensity: 0.9 },
      'phone': { color: '#ffffff', intensity: 0.5 },
    };

    clonedScene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        const led = ledMeshes[obj.name];
        if (led) {
          obj.material = new THREE.MeshStandardMaterial({
            color: led.color,
            emissive: new THREE.Color(led.color),
            emissiveIntensity: led.intensity,
            toneMapped: false,
          });
        }

        if (obj.userData?.sectionKey) {
          console.log(`Interactive mesh: ${obj.name} → sectionKey: ${obj.userData.sectionKey}`);
        }
      }
    });

    const found = [];

    clonedScene.traverse((obj) => {
      if (obj.isMesh && obj.userData?.sectionKey) {
        const sectionKey = obj.userData.sectionKey;

        obj.updateWorldMatrix(true, false);
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        const worldScale = new THREE.Vector3();
        obj.matrixWorld.decompose(worldPos, worldQuat, worldScale);

        found.push({
          geometry: obj.geometry,
          position: worldPos.clone(),
          rotation: new THREE.Euler().setFromQuaternion(worldQuat),
          scale: worldScale.clone(),
          sectionKey,
        });
      }
    });

    setInteractiveMeshes(found);
  }, [clonedScene]);

  // === Pulse highlight animation ===
  useFrame(({ clock }) => {
    meshRefs.current.forEach((ref, index) => {
      if (ref) {
        const isHovered = hoveredIndex === index;
        const pulse = 1 + 0.05 * Math.sin(clock.elapsedTime * 5);
        ref.scale.setScalar(isHovered ? pulse : 1);
      }
    });
  });

  return (
    <>
      <primitive object={clonedScene} />

      {interactiveMeshes.map(({ geometry, position, rotation, scale, sectionKey }, i) => (
        <mesh
          key={i}
          ref={(ref) => (meshRefs.current[i] = ref)}
          geometry={geometry}
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={(e) => {
            e.stopPropagation();
            onObjectClick(sectionKey, position);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredIndex(i);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoveredIndex(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Transparent hitbox with slight color to visualize area */}
          <meshBasicMaterial
            transparent
            opacity={0.05}
            color={hoveredIndex === i ? 'cyan' : 'white'}
            depthWrite={false}
          />

          {hoveredIndex === i && (
            <Html center distanceFactor={10} position={[0, 1, 0]}>
              <div
                style={{
                  background: 'white',
                  color: 'black',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                  transform: 'translateY(-10px)',
                }}
              >
                {sectionKey}
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </>
  );
}
