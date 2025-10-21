import { useState, useEffect } from 'react';
import useSimulationStore from './store/useSimulationStore';
import FissionScene from './components/FissionScene';
import FusionScene from './components/FusionScene';
import ControlPanel from './components/ControlPanel';
import EnergyChart from './components/EnergyChart';
import DataPanel from './components/DataPanel';
import './App.css';

function App() {
  const mode = useSimulationStore((state) => state.mode);
  const theme = useSimulationStore((state) => state.theme);
  const toggleTheme = useSimulationStore((state) => state.toggleTheme);

  // Apply theme to body element
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </button>

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
