import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';

import Room from './Room';
import Header from './components/Header';
import Modal from './components/Modal';
import LoadingScreen from './components/LoadingScreen';
import ControlsWrapper from './components/ControlsWrapper';

export default function App() {
  const [focusTarget, setFocusTarget] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const sectionData = {
    education: {
      title: 'Education & Certifications',
      icon: '🎓',
      items: [
        {
          category: 'MSc in Computer Applications',
          details: 'Symbiosis Institute of Computer Studies and Research, Pune',
          duration: '2023 - 2025',
        },
        {
          category: 'BSc in Computer Science',
          details: 'Dr. Ambedkar College, Nagpur',
          duration: '2020 - 2023',
        },
      ],
    },
    skills: {
      title: 'Technical Skills',
      icon: '🛠️',
      items: [
        {
          category: 'Languages',
          details: 'JavaScript, TypeScript, HTML5, CSS3, Python, C++, Java',
        },
        {
          category: 'Frameworks',
          details: 'React.js, Vue.js, Bootstrap, Django, Chart.js',
        },
        {
          category: '3D',
          details: 'Three.js, WebGL, Unity 3D, Blender',
        },
      ],
    },
    projects: {
      title: 'Featured Projects',
      icon: '🚀',
      items: [
        {
          name: 'TrackItAll',
          description: 'Dashboard for student performance with real-time data.',
          tech: 'React, Chart.js, Django',
          year: '2023',
        },
        {
          name: 'Tech-Store',
          description: 'Responsive e-commerce site optimized for UX.',
          tech: 'HTML, CSS, JavaScript',
          year: '2023',
        },
      ],
    },
    contacts: {
      title: 'Get In Touch',
      icon: '📱',
      items: [
        {
          method: 'Email',
          details: 'smahinn1@gmail.com',
        },
        {
          method: 'Phone',
          details: '+91 7888000365',
        },
      ],
    },
    hobbies: {
      title: 'Hobbies & Interests',
      icon: '🎸',
      items: [
        {
          category: 'Creative Hobbies',
          details: 'Playing guitar, digital art, game dev, 3D modeling.',
        },
      ],
    },
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleObjectClick = (sectionKey, position) => {
    const camOffset = new THREE.Vector3(0, 0.5, 2);
    const focusPosition = position.clone().add(camOffset);
    setFocusTarget({ position: focusPosition, target: position });
    setActiveSection(sectionKey);
    setShowResetBtn(false);
  };

  const handleCloseModal = () => {
    setActiveSection(null);
    setShowResetBtn(true);
  };

  const handleReset = () => {
    setFocusTarget(null);
    setResetTrigger(prev => !prev);
    setShowResetBtn(false);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#111' }}>
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />
      <Header onReset={handleReset} />

      <Canvas
        shadows
        camera={{ position: [3, 3, 3], fov: 40 }}
        onCreated={() => setTimeout(() => setIsLoading(false), 500)}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}
      >
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
          <Environment preset="night" />
          <EffectComposer disableNormalPass multisampling={4}>
            <Bloom intensity={0.35} luminanceThreshold={0.5} luminanceSmoothing={0.25} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {activeSection && (
        <Modal activeSection={activeSection} sectionData={sectionData} onClose={handleCloseModal} />
      )}

      {showResetBtn && !activeSection && (
        <button
          onClick={handleReset}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '12px 20px',
            background: 'rgba(30, 30, 40, 0.7)',
            color: 'white',
            border: '1px solid rgba(100, 220, 255, 0.3)',
            borderRadius: '8px',
            fontSize: '0.95rem',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
        >
          Reset View
        </button>
      )}
    </div>
  );
}
