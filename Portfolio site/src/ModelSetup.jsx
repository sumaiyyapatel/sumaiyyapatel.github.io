import React from 'react'
import { useGLTF, Html } from '@react-three/drei'

export default function ModelSetup() {
  const { scene } = useGLTF('/models/room.glb')
  
  // Clone and set up the scene
  const roomScene = React.useMemo(() => {
    const clonedScene = scene.clone()
    
    // Setup objects for interaction
    clonedScene.traverse((node) => {
      if (node.isMesh) {
        // Enable shadows
        node.castShadow = true
        node.receiveShadow = true
        
        // Set up materials
        if (node.material) {
          node.material = node.material.clone()
          node.material.roughness = 0.8
        }
        
        // Setup helpers for interactive objects
        if (node.name.includes('Computer') || node.name.includes('Monitor')) {
          node.userData.type = 'computer'
          node.userData.hoverable = true
        } else if (node.name.includes('Desk')) {
          node.userData.type = 'desk'
          node.userData.hoverable = true
        } else if (node.name.includes('Bed')) {
          node.userData.type = 'bed'
          node.userData.hoverable = true
        } else if (node.name.includes('Wall') || node.name.includes('Frame') || node.name.includes('Art')) {
          node.userData.type = 'wall'
          node.userData.hoverable = true
        } else if (node.name.includes('Door')) {
          node.userData.type = 'door'
          node.userData.hoverable = true
        }
      }
    })
    
    return clonedScene
  }, [scene])
  
  return (
    <>
      <primitive object={roomScene} />
      
      {/* Optional hover indicators */}
      <HoverIndicators />
    </>
  )
}

function HoverIndicators() {
  // These indicators would appear when hovering over interactive objects
  return (
    <>
      <group position={[0.5, 1.2, 0]} name="desk-indicator" visible={false}>
        <Html center>
          <div className="object-indicator">
            <span>Skills & Technologies</span>
          </div>
        </Html>
      </group>
      
      <group position={[-0.5, 1.5, 0]} name="wall-indicator" visible={false}>
        <Html center>
          <div className="object-indicator">
            <span>Education & Certificates</span>
          </div>
        </Html>
      </group>
      
      <group position={[0.5, 1.2, 0]} name="computer-indicator" visible={false}>
        <Html center>
          <div className="object-indicator">
            <span>Work Experience</span>
          </div>
        </Html>
      </group>
      
      <group position={[-1, 0.8, 0]} name="bed-indicator" visible={false}>
        <Html center>
          <div className="object-indicator">
            <span>Projects</span>
          </div>
        </Html>
      </group>
      
      <group position={[2, 1.3, 0]} name="door-indicator" visible={false}>
        <Html center>
          <div className="object-indicator">
            <span>Contact Information</span>
          </div>
        </Html>
      </group>
    </>
  )
}