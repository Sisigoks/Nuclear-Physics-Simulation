import { useState } from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { FISSION_REACTIONS, FUSION_REACTIONS, calculateCoulombBarrier } from '../data/reactions';
import './ControlPanel.css';

function ControlPanel() {
  const {
    mode,
    setMode,
    selectedFissionReaction,
    setSelectedFissionReaction,
    selectedFusionReaction,
    setSelectedFusionReaction,
    isPaused,
    togglePause,
    speed,
    setSpeed
  } = useSimulationStore();
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };
  
  const handleFissionReactionChange = (reactionId) => {
    const reaction = FISSION_REACTIONS.find(r => r.id === reactionId);
    setSelectedFissionReaction(reaction);
  };
  
  const handleFusionReactionChange = (reactionId) => {
    const reaction = FUSION_REACTIONS.find(r => r.id === reactionId);
    setSelectedFusionReaction(reaction);
  };
  
  return (
    <div className="control-panel">
      {/* Mode Selection */}
      <div className="control-section">
        <h2>Simulation Mode</h2>
        <div className="button-group">
          <button
            className={`mode-btn ${mode === 'fission' ? 'active' : ''}`}
            onClick={() => handleModeChange('fission')}
          >
            Nuclear Fission
          </button>
          <button
            className={`mode-btn ${mode === 'fusion' ? 'active' : ''}`}
            onClick={() => handleModeChange('fusion')}
          >
            Nuclear Fusion
          </button>
        </div>
      </div>
      
      {/* Fission Controls */}
      {mode === 'fission' && (
        <>
          <div className="control-section">
            <h2>Fission Reaction Type</h2>
            <select
              className="reaction-select"
              value={selectedFissionReaction.id}
              onChange={(e) => handleFissionReactionChange(e.target.value)}
            >
              {FISSION_REACTIONS.map(reaction => (
                <option key={reaction.id} value={reaction.id}>
                  {reaction.products[0].symbol} + {reaction.products[1].symbol} + {reaction.neutronsReleased}n ({reaction.energy} MeV)
                </option>
              ))}
            </select>
            
            <div className="reaction-info">
              <h3>Reaction Details:</h3>
              <p><strong>Fuel:</strong> {selectedFissionReaction.fuel}</p>
              <p><strong>Products:</strong></p>
              <ul>
                {selectedFissionReaction.products.map((p, i) => (
                  <li key={i}>
                    <span style={{ color: p.color }}>●</span> {p.name} ({p.symbol})
                    - {p.protons}p + {p.neutrons}n
                  </li>
                ))}
              </ul>
              <p><strong>Neutrons Released:</strong> {selectedFissionReaction.neutronsReleased}</p>
              <p><strong>Energy Released:</strong> {selectedFissionReaction.energy} MeV</p>
              <p><strong>Probability:</strong> {selectedFissionReaction.probability}%</p>
            </div>
          </div>
          
          <div className="control-section">
            <h2>Fission Controls</h2>
            <button
              className="action-btn primary"
              onClick={() => window.triggerFission?.()}
            >
              Bombard Neutron (Top)
            </button>
            <button
              className="action-btn secondary"
              onClick={() => window.resetFission?.()}
            >
              Reset
            </button>
            
            <div className="info-text">
              <p>• Neutron strikes nucleus from above</p>
              <p>• Nucleus splits into two atoms</p>
              <p>• Atoms remain intact and move apart</p>
              <p>• Neutrons are ejected separately</p>
              <p>• Right-click + drag to pan camera</p>
              <p>• Scroll to zoom (1-200 units range)</p>
            </div>
          </div>
        </>
      )}
      
      {/* Fusion Controls */}
      {mode === 'fusion' && (
        <>
          <div className="control-section">
            <h2>Fusion Reaction Type</h2>
            <select
              className="reaction-select"
              value={selectedFusionReaction.id}
              onChange={(e) => handleFusionReactionChange(e.target.value)}
            >
              {FUSION_REACTIONS.map(reaction => (
                <option key={reaction.id} value={reaction.id}>
                  {reaction.name} ({reaction.energy} MeV)
                </option>
              ))}
            </select>
            
            <div className="reaction-info">
              <h3>Reaction Details:</h3>
              <p><strong>Reactants:</strong></p>
              <ul>
                {selectedFusionReaction.reactants.map((r, i) => (
                  <li key={i}>
                    <span style={{ color: r.color }}>●</span> {r.name} ({r.symbol})
                    - {r.protons}p + {r.neutrons}n
                  </li>
                ))}
              </ul>
              <p><strong>Products:</strong></p>
              <ul>
                {selectedFusionReaction.products.map((p, i) => (
                  <li key={i}>
                    <span style={{ color: p.color }}>●</span> {p.name} ({p.symbol})
                  </li>
                ))}
              </ul>
              <p><strong>Energy Released:</strong> {selectedFusionReaction.energy} MeV</p>
              <p><strong>Temperature Required:</strong> {selectedFusionReaction.temperature} million K</p>
              <p><strong>Coulomb Barrier:</strong> {calculateCoulombBarrier(selectedFusionReaction.reactants[0], selectedFusionReaction.reactants[1]).toFixed(2)} MeV</p>
              {selectedFusionReaction.special && (
                <p><strong>Special:</strong> {selectedFusionReaction.special}</p>
              )}
            </div>
          </div>
          
          <div className="control-section">
            <h2>Fusion Controls</h2>
            <button
              className="action-btn primary"
              onClick={() => window.startFusion?.()}
            >
              Start Fusion
            </button>
            <button
              className="action-btn secondary"
              onClick={() => window.triggerFusion?.()}
            >
              Trigger Fusion
            </button>
            <button
              className="action-btn secondary"
              onClick={() => window.resetFusion?.()}
            >
              Reset
            </button>
            
            <div className="info-text">
              <p>• Click "Start Fusion" to begin</p>
              <p>• Nuclei will approach each other</p>
              <p>• Click "Trigger Fusion" when close (&lt;1.5 units)</p>
              <p>• Products will be created and ejected</p>
              <p>• Right-click + drag to pan camera</p>
              <p>• Scroll to zoom (1-200 units range)</p>
            </div>
          </div>
        </>
      )}
      
      {/* General Controls */}
      <div className="control-section">
        <h2>Simulation Speed</h2>
        <div className="slider-control">
          <label>
            Speed: <span className="speed-value">{speed.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>
        
        <button
          className="action-btn secondary"
          onClick={togglePause}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
