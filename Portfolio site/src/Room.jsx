import { useGLTF, Html } from '@react-three/drei';
import { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

export default function Room({ onObjectClick }) {
  const { scene } = useGLTF('/models/room.glb');
  const [interactiveMeshes, setInteractiveMeshes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

    // Apply emissive material and debug all meshes
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

        // Debug: log mesh name and userData
        if (obj.userData?.sectionKey) {
          console.log(`Interactive mesh: ${obj.name} → sectionKey: ${obj.userData.sectionKey}`);
        }
      }
    });

    const found = [];

    clonedScene.traverse((obj) => {
      if (obj.isMesh && obj.userData?.sectionKey) {
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
          sectionKey: obj.userData.sectionKey,
        });
      }
    });

    if (found.length === 0) {
      console.warn('⚠️ No interactive meshes found. Check sectionKey in GLB.');
    }

    setInteractiveMeshes(found);
  }, [clonedScene]);

  return (
    <>
      <primitive object={clonedScene} />

      {interactiveMeshes.map(({ geometry, position, rotation, scale, sectionKey }, i) => (
        <mesh
          key={i}
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
          <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
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
