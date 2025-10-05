import { useState } from 'react';
import useSimulationStore from './store/useSimulationStore';
import FissionScene from './components/FissionScene';
import FusionScene from './components/FusionScene';
import ControlPanel from './components/ControlPanel';
import EnergyChart from './components/EnergyChart';
import DataPanel from './components/DataPanel';
import './App.css';

function App() {
  const mode = useSimulationStore((state) => state.mode);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nuclear Physics Investigatory Study</h1>
        <p>Interactive Fission & Fusion Simulation with Realistic Calculations</p>
      </header>
      
      <div className="main-layout">
        <div className="scene-container">
          {mode === 'fission' ? <FissionScene /> : <FusionScene />}
        </div>
        
        <ControlPanel />
      </div>
      
      <div className="analysis-data-layout">
        <EnergyChart />
        <DataPanel />
      </div>
    </div>
  );
}

export default App;
