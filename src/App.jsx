import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Room from './Room';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function ControlsWrapper({ focusTarget, resetTrigger }) {
  const controlsRef = useRef();
  const { camera, scene } = useThree();
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
  }, []);

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      setCanInteract(intersects.length > 0);
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [camera, scene]);

  useEffect(() => {
    if (!focusTarget || !controlsRef.current) return;
    const { position, target } = focusTarget;
    const duration = 0.6;
    const startPos = camera.position.clone();
    const startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const t = Math.min((now - startTime) / (duration * 1000), 1);
      camera.position.lerpVectors(startPos, position, t);
      controlsRef.current.target.lerpVectors(controlsRef.current.target, target, t);
      controlsRef.current.update();
      if (t < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [focusTarget]);

  useEffect(() => {
    if (resetTrigger && controlsRef.current) {
      camera.position.set(3, 3, 3);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [resetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={canInteract}
      enableRotate={canInteract}
      enablePan={false}
      zoomToCursor
      makeDefault
    />
  );
}

export default function App() {
  const [focusTarget, setFocusTarget] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [lastCameraState, setLastCameraState] = useState(null);

  const sectionData = {
    laptop: {
      title: 'Resume',
      content: 'Experienced developer with skills in React, Three.js, and more...',
    },
    'monitor_1_2': {
      title: 'Skills',
      content: 'JavaScript, Three.js, Blender, WebGL...',
    },
    monitor2_1: {
      title: 'Projects',
      content: 'Game dev projects, frontend apps, 3D portfolio...',
    },
    phone: {
      title: 'Contact',
      content: 'Email: dev@example.com | Phone: 123-456-7890',
    },
    guitar: {
      title: 'Hobbies',
      content: 'Playing guitar, 3D modeling, gaming...',
    },
  };

  const handleObjectClick = (sectionKey, position) => {
    const camOffset = new THREE.Vector3(0, 0.5, 2);
    const focusPosition = position.clone().add(camOffset);
    setLastCameraState({ position: focusPosition, target: position });
    setActiveSection(sectionKey);
  };

  const handleCloseModal = () => {
    setActiveSection(null);
    setFocusTarget(lastCameraState); // restore camera view
    setShowResetBtn(true);
  };

  const handleReset = () => {
    setFocusTarget(null);
    setResetTrigger(prev => !prev);
    setShowResetBtn(false);
  };

  return (
    <div style={{ width: '100%', height: '100vh', background: '#111' }}>
      <h1 style={{
        color: 'white',
        textAlign: 'center',
        margin: '0',
        padding: '1rem 0',
        fontFamily: 'sans-serif',
        fontSize: '2rem',
      }}>
        Welcome to my portfolio
      </h1>

      {/* Only show canvas when modal is NOT open */}
      {!activeSection && (
        <div style={{ width: '100%', height: 'calc(100% - 4rem)' }}>
          <Canvas shadows camera={{ position: [3, 2.5, 3], fov: 40 }}>
            <ambientLight intensity={0.15} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={0.5}
              castShadow
              shadow-mapSize-width={512}
              shadow-mapSize-height={512}
              shadow-bias={-0.0001}
            />
            <Suspense fallback={null}>
              <Room onObjectClick={handleObjectClick} />
              <ControlsWrapper focusTarget={focusTarget} resetTrigger={resetTrigger} />
              <EffectComposer disableNormalPass multisampling={4}>
                <Bloom
                  intensity={0.35}
                  luminanceThreshold={0.5}
                  luminanceSmoothing={0.25}
                />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>
      )}

      {activeSection && (
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a1a',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          boxShadow: '0 0 20px #000',
          color: '#fff',
          zIndex: 10,
        }}>
          <h2>{sectionData[activeSection]?.title || 'Info'}</h2>
          <p>{sectionData[activeSection]?.content || 'No data available.'}</p>
          <button
            onClick={handleCloseModal}
            style={{
              marginTop: '20px',
              padding: '8px 12px',
              border: 'none',
              background: '#333',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {showResetBtn && !activeSection && (
        <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '10px 14px',
            background: '#ffffff22',
            color: 'white',
            border: '1px solid #aaa',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
          }}
        >
          Reset Camera
        </button>
      )}
    </div>
  );
}
