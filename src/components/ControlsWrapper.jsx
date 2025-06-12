import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ControlsWrapper({ focusTarget, resetTrigger }) {
  const controlsRef = useRef();
  const { camera, scene } = useThree();
  const [canInteract, setCanInteract] = useState(false);

  // Initial camera setup
  useEffect(() => {
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
  }, []);

  // Pointer move (mouse or single touch) interaction detection
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateMouseAndCheckIntersect = (x, y) => {
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      setCanInteract(intersects.length > 0);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return; // Skip mouse events during touch
      updateMouseAndCheckIntersect(event.clientX, event.clientY);
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        updateMouseAndCheckIntersect(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [camera, scene]);

  // Handle multi-touch to allow zooming/rotation even when not directly over object
  useEffect(() => {
    let isMultiTouch = false;

    const onTouchStart = (event) => {
      if (event.touches.length > 1) {
        isMultiTouch = true;
        setCanInteract(true);
      }
    };

    const onTouchEnd = () => {
      isMultiTouch = false;
      // Optional: re-check if still hovering over object
      // You could trigger a pointermove-like check here if needed
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Focus animation effect
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

  // Reset camera
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