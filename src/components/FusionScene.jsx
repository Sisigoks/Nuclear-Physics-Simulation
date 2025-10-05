import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import useSimulationStore from '../store/useSimulationStore';
import { calculateCoulombBarrier } from '../data/reactions';

// Reactant Nucleus
function ReactantNucleus({ isotope, startPosition, targetPosition, isActive, onPositionUpdate }) {
  const groupRef = useRef();
  const [position, setPosition] = useState(startPosition);
  const velocity = useRef(new THREE.Vector3());
  
  useEffect(() => {
    if (isActive) {
      const direction = new THREE.Vector3(...targetPosition).sub(new THREE.Vector3(...startPosition));
      direction.normalize();
      velocity.current = direction.multiplyScalar(0.15);
    }
  }, [isActive, startPosition, targetPosition]);
  
  useFrame((state, delta) => {
    if (isActive && groupRef.current) {
      groupRef.current.position.x += velocity.current.x * delta * 30;
      groupRef.current.position.y += velocity.current.y * delta * 30;
      groupRef.current.position.z += velocity.current.z * delta * 30;
      
      // Update parent with current position
      if (onPositionUpdate) {
        onPositionUpdate({
          x: groupRef.current.position.x,
          y: groupRef.current.position.y,
          z: groupRef.current.position.z
        });
      }
    }
  });
  
  // Generate particles for this nucleus
  const particles = [];
  const particleCount = isotope.mass * 2; // More visible
  const radius = Math.pow(isotope.mass, 1/3) * 0.3;
  
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * radius;
    
    const isProton = i < isotope.protons * 2; // First portion are protons
    
    particles.push({
      localPosition: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ],
      color: isProton ? '#ff3333' : '#3333ff'
    });
  }
  
  return (
    <group ref={groupRef} position={startPosition}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[0.12, 12, 12]} position={p.localPosition}>
          <meshPhongMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color={isotope.color}
        anchorX="center"
        anchorY="middle"
      >
        {isotope.symbol}
      </Text>
    </group>
  );
}

// Product Particle
function ProductParticle({ product, startPosition, direction, speed, delay = 0 }) {
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
      
      velocity.current.multiplyScalar(0.98);
    }
  });
  
  // Generate particles
  const particles = [];
  let particleCount, radius;
  
  if (product.symbol === 'n' || product.symbol === 'p') {
    // Single particle
    particleCount = 1;
    radius = 0;
  } else {
    // Multi-particle nucleus
    particleCount = product.mass * 2;
    radius = Math.pow(product.mass, 1/3) * 0.3;
  }
  
  for (let i = 0; i < particleCount; i++) {
    if (radius === 0) {
      particles.push({ localPosition: [0, 0, 0], color: product.color });
    } else {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * radius;
      
      const isProton = i < product.protons * 2;
      
      particles.push({
        localPosition: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        color: isProton ? '#ff3333' : '#3333ff'
      });
    }
  }
  
  const displaySize = product.symbol === 'n' || product.symbol === 'p' ? 0.25 : 0.12;
  
  return (
    <group ref={groupRef} position={startPosition}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[displaySize, 12, 12]} position={p.localPosition}>
          <meshPhongMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.6}
          />
        </Sphere>
      ))}
      <Text
        position={[0, -1.5, 0]}
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

// Fusion Flash Effect
function FusionFlash({ position, show }) {
  const meshRef = useRef();
  const [scale, setScale] = useState(0);
  
  useEffect(() => {
    if (show) {
      setScale(0);
      const interval = setInterval(() => {
        setScale(prev => {
          if (prev >= 3) {
            clearInterval(interval);
            return 3;
          }
          return prev + 0.3;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [show]);
  
  if (!show) return null;
  
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
      <meshBasicMaterial
        color="#ffff00"
        transparent
        opacity={Math.max(0, 1 - scale / 3)}
      />
    </Sphere>
  );
}

// Main Fusion Scene Logic
function FusionSceneContent() {
  const selectedReaction = useSimulationStore((state) => state.selectedFusionReaction);
  const recordExperiment = useSimulationStore((state) => state.recordExperiment);
  
  const [phase, setPhase] = useState('ready'); // 'ready', 'approaching', 'fusing', 'complete'
  const [showFlash, setShowFlash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetKey, setResetKey] = useState(0); // Force re-render on reset
  const reactant1Pos = useRef({ x: -5, y: 0, z: 0 });
  const reactant2Pos = useRef({ x: 5, y: 0, z: 0 });
  
  const handleStart = useCallback(() => {
    setPhase('approaching');
  }, []);
  
  const handleAccelerate = useCallback(() => {
    if (phase === 'ready' || phase === 'approaching') {
      setPhase('approaching');
    }
  }, [phase]);
  
  const handleTriggerFusion = useCallback(() => {
    if (phase === 'approaching') {
      // Calculate distance between nuclei
      const pos1 = reactant1Pos.current;
      const pos2 = reactant2Pos.current;
      const distance = Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) +
        Math.pow(pos1.y - pos2.y, 2) +
        Math.pow(pos1.z - pos2.z, 2)
      );
      
      // Check if nuclei are close enough (within 1.5 units)
      const FUSION_THRESHOLD = 1.5;
      
      if (distance > FUSION_THRESHOLD) {
        setErrorMessage(`⚠️ Fusion cannot occur! Nuclei are ${distance.toFixed(2)} units apart. They must be within ${FUSION_THRESHOLD} units. Wait longer or try again.`);
        setTimeout(() => setErrorMessage(''), 4000);
        return;
      }
      
      // Close enough - proceed with fusion
      setErrorMessage('');
      setPhase('fusing');
      setShowFlash(true);
      
      setTimeout(() => {
        setShowFlash(false);
        setPhase('complete');
        
        // Record experiment
        const coulombBarrier = calculateCoulombBarrier(
          selectedReaction.reactants[0],
          selectedReaction.reactants[1]
        );
        
        recordExperiment({
          type: 'fusion',
          reactionId: selectedReaction.id,
          reaction: selectedReaction.name,
          reactants: selectedReaction.reactants.map(r => r.symbol).join(' + '),
          products: selectedReaction.products.map(p => p.symbol).join(' + '),
          energy: selectedReaction.energy,
          coulombBarrier: coulombBarrier.toFixed(2),
          temperature: selectedReaction.temperature,
          fullReaction: `${selectedReaction.reactants.map(r => r.symbol).join(' + ')} → ${selectedReaction.products.map(p => p.symbol).join(' + ')} + ${selectedReaction.energy} MeV`
        });
      }, 1000);
    }
  }, [phase, recordExperiment, selectedReaction]);
  
  const handleReset = useCallback(() => {
    setPhase('ready');
    setShowFlash(false);
    setErrorMessage('');
    reactant1Pos.current = { x: -5, y: 0, z: 0 };
    reactant2Pos.current = { x: 5, y: 0, z: 0 };
    setResetKey(prev => prev + 1); // Force component re-mount
  }, []);
  
  // Make functions available globally
  useEffect(() => {
    window.startFusion = handleStart;
    window.accelerateFusion = handleAccelerate;
    window.triggerFusion = handleTriggerFusion;
    window.resetFusion = handleReset;
    
    return () => {
      delete window.startFusion;
      delete window.accelerateFusion;
      delete window.triggerFusion;
      delete window.resetFusion;
    };
  }, [handleStart, handleAccelerate, handleTriggerFusion, handleReset]);
  
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, 10, -10]} intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={0.5} color="#00ffff" />
      
      {/* Status text */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.5}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        {phase === 'ready' && 'Ready - Click Start Fusion'}
        {phase === 'approaching' && 'Nuclei Approaching - Click Trigger Fusion'}
        {phase === 'fusing' && 'Fusion in Progress...'}
        {phase === 'complete' && `Fusion Complete! Energy: ${selectedReaction.energy} MeV`}
      </Text>
      
      {/* Error message */}
      {errorMessage && (
        <Text
          position={[0, 4, 0]}
          fontSize={0.4}
          color="#ff6b6b"
          anchorX="center"
          anchorY="middle"
          maxWidth={15}
        >
          {errorMessage}
        </Text>
      )}
      
      {/* Reactants - key forces re-mount on reset */}
      {(phase === 'ready' || phase === 'approaching') && (
        <>
          <ReactantNucleus
            key={`reactant1-${resetKey}`}
            isotope={selectedReaction.reactants[0]}
            startPosition={[-5, 0, 0]}
            targetPosition={[0, 0, 0]}
            isActive={phase === 'approaching'}
            onPositionUpdate={(pos) => { reactant1Pos.current = pos; }}
          />
          <ReactantNucleus
            key={`reactant2-${resetKey}`}
            isotope={selectedReaction.reactants[1]}
            startPosition={[5, 0, 0]}
            targetPosition={[0, 0, 0]}
            isActive={phase === 'approaching'}
            onPositionUpdate={(pos) => { reactant2Pos.current = pos; }}
          />
        </>
      )}
      
      {/* Fusion Flash */}
      <FusionFlash position={[0, 0, 0]} show={showFlash} />
      
      {/* Products */}
      {phase === 'complete' && (
        <>
          {selectedReaction.products.map((product, index) => (
            <ProductParticle
              key={index}
              product={product}
              startPosition={[0, 0, 0]}
              direction={index === 0 ? [0.5, 0.3, 0] : [-0.5, -0.3, 0]}
              speed={1.2}
              delay={200 + index * 100}
            />
          ))}
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

function FusionScene() {
  return (
    <div style={{ width: '100%', height: '700px', background: '#0a0a1a', borderRadius: '10px' }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 75 }}>
        <FusionSceneContent />
      </Canvas>
    </div>
  );
}

export default FusionScene;
