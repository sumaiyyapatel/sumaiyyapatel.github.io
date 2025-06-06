import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ControlsWrapper({ focusTarget, resetTrigger }) {
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
