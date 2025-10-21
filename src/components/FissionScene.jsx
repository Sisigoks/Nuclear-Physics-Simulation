import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import useSimulationStore from '../store/useSimulationStore';

// Nucleus component - represents an intact atom
function Nucleus({ position, particles, label, color, textColor }) {
  const groupRef = useRef();
  
  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <Sphere
          key={i}
          args={[0.15, 12, 12]}
          position={p.localPosition}
        >
          <meshPhongMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
      <Text
        position={[0, -2, 0]}
        fontSize={0.4}
        color={textColor || "#00d4ff"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Product Atom - represents fission product that moves away as a coherent unit
function ProductAtom({ product, direction, speed, delay = 0 }) {
  const groupRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);
  const velocity = useRef(new THREE.Vector3(direction[0], direction[1], direction[2]).multiplyScalar(speed));
  
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useFrame((state, delta) => {
    if (hasStarted && groupRef.current) {
      groupRef.current.position.x += velocity.current.x * delta * 30;
      groupRef.current.position.y += velocity.current.y * delta * 30;
      groupRef.current.position.z += velocity.current.z * delta * 30;
      
      // Damping
      velocity.current.multiplyScalar(0.98);
    }
  });
  
  // Generate particle positions in spherical distribution
  const particles = [];
  const displayCount = Math.min(30, product.mass); // Representative particles
  const radius = Math.pow(product.mass, 1/3) * 0.5;
  
  for (let i = 0; i < displayCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * radius;
    
    particles.push({
      localPosition: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ],
      color: product.color
    });
  }
  
  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[0.15, 12, 12]} position={p.localPosition}>
          <meshPhongMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.4}
          />
        </Sphere>
      ))}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.35}
        color={product.color}
        anchorX="center"
        anchorY="middle"
      >
        {product.symbol}
      </Text>
    </group>
  );
}

// Free Neutron - ejected during fission
function FreeNeutron({ startPosition, direction, speed, delay = 0 }) {
  const meshRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);
  const velocity = useRef(new THREE.Vector3(direction[0], direction[1], direction[2]).multiplyScalar(speed));
  
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useFrame((state, delta) => {
    if (hasStarted && meshRef.current) {
      meshRef.current.position.x += velocity.current.x * delta * 30;
      meshRef.current.position.y += velocity.current.y * delta * 30;
      meshRef.current.position.z += velocity.current.z * delta * 30;
      
      velocity.current.multiplyScalar(0.96);
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[0.25, 12, 12]} position={startPosition}>
      <meshPhongMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

// Incoming Neutron - the bombardment neutron
function IncomingNeutron({ onCollision }) {
  const meshRef = useRef();
  const [hasCollided, setHasCollided] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current && !hasCollided) {
      meshRef.current.position.y -= 1.5 * delta * 30; // Move downward
      
      // Check for collision
      if (meshRef.current.position.y < 0.5) {
        setHasCollided(true);
        onCollision();
      }
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[0.3, 12, 12]} position={[0, 12, 0]}>
      <meshPhongMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.6}
      />
    </Sphere>
  );
}
// Main Fission Scene Logic
function FissionSceneContent() {
  const selectedReaction = useSimulationStore((state) => state.selectedFissionReaction);
  const recordExperiment = useSimulationStore((state) => state.recordExperiment);
  const [showIncomingNeutron, setShowIncomingNeutron] = useState(false);
  const [showNucleus, setShowNucleus] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  
  // Generate U-235 nucleus particles
  const nucleusParticles = [];
  const nucleusCount = 50; // Representative particles
  const nucleusRadius = 1.5;
  
  for (let i = 0; i < nucleusCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * nucleusRadius;
    
    const isProton = i < 23; // Approximately proton ratio
    
    nucleusParticles.push({
      localPosition: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ],
      color: isProton ? '#ff3333' : '#3333ff'
    });
  }
  
  const handleCollision = useCallback(() => {
    setShowIncomingNeutron(false);
    setShowNucleus(false);
    setShowProducts(true);
    
    // Record experiment
    recordExperiment({
      type: 'fission',
      reactionId: selectedReaction.id,
      fuel: selectedReaction.fuel,
      products: selectedReaction.products.map(p => p.symbol).join(' + '),
      neutronsReleased: selectedReaction.neutronsReleased,
      energy: selectedReaction.energy,
      reaction: `${selectedReaction.fuel} + n → ${selectedReaction.products[0].symbol} + ${selectedReaction.products[1].symbol} + ${selectedReaction.neutronsReleased}n`
    });
  }, [recordExperiment, selectedReaction]);
  
  const handleBombardNeutron = useCallback(() => {
    setShowIncomingNeutron(true);
  }, []);
  
  const handleReset = useCallback(() => {
    setShowNucleus(true);
    setShowIncomingNeutron(false);
    setShowProducts(false);
  }, []);
  
  // Make functions available globally
  useEffect(() => {
    window.bombardNeutron = handleBombardNeutron;
    window.triggerFission = handleBombardNeutron; // Also expose as triggerFission
    window.resetFission = handleReset;
    
    return () => {
      delete window.bombardNeutron;
      delete window.triggerFission;
      delete window.resetFission;
    };
  }, [handleBombardNeutron, handleReset]);
  
  const theme = useSimulationStore((state) => state.theme);
  const textColor = theme === 'dark' ? '#00d4ff' : '#6366f1';
  const energyColor = theme === 'dark' ? '#ffd700' : '#8b5cf6';
  const lightIntensity = theme === 'dark' ? 0.6 : 1.2;
  
  return (
    <>
      <ambientLight intensity={lightIntensity} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 1.5 : 1.2} />
      <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.5 : 0.8} />
      
      {/* Initial U-235 Nucleus */}
      {showNucleus && (
        <Nucleus
          position={[0, 0, 0]}
          particles={nucleusParticles}
          label="U-235"
          color="#ff6600"
          textColor={textColor}
        />
      )}
      
      {/* Incoming Neutron */}
      {showIncomingNeutron && (
        <IncomingNeutron onCollision={handleCollision} />
      )}
      
      {/* Fission Products - remain as intact atoms */}
      {showProducts && (
        <>
          <ProductAtom
            product={selectedReaction.products[0]}
            direction={[-1, 0.1, 0.1]}
            speed={1.2}
            delay={100}
          />
          <ProductAtom
            product={selectedReaction.products[1]}
            direction={[1, -0.1, -0.1]}
            speed={1.5}
            delay={100}
          />
          
          {/* Ejected Neutrons */}
          {Array.from({ length: selectedReaction.neutronsReleased }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / selectedReaction.neutronsReleased;
            return (
              <FreeNeutron
                key={i}
                startPosition={[0, 0, 0]}
                direction={[
                  Math.cos(angle),
                  Math.sin(angle) * 0.5,
                  Math.sin(angle + Math.PI / 4)
                ]}
                speed={1.8}
                delay={150 + i * 50}
              />
            );
          })}
          
          {/* Energy display */}
          <Text
            position={[0, 5, 0]}
            fontSize={0.6}
            color={energyColor}
            anchorX="center"
            anchorY="middle"
          >
            Energy Released: {selectedReaction.energy} MeV
          </Text>
        </>
      )}
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        enablePan={true}
        panSpeed={2.0}
        screenSpacePanning={true}
        enableZoom={true}
        zoomSpeed={1.5}
        enableRotate={true}
        rotateSpeed={0.8}
        minDistance={1}
        maxDistance={200}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </>
  );
}

function FissionScene() {
  const theme = useSimulationStore((state) => state.theme);
  const sceneBackground = theme === 'dark' ? '#0a0a1a' : '#f8f9fa';
  
  return (
    <div style={{ width: '100%', height: '700px', background: sceneBackground, borderRadius: '10px', transition: 'background 0.3s ease' }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 75 }}>
        <color attach="background" args={[sceneBackground]} />
        <FissionSceneContent />
      </Canvas>
    </div>
  );
}

export default FissionScene;
