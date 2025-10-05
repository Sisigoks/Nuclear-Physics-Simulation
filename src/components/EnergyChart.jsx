import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useSimulationStore from '../store/useSimulationStore';
import './EnergyChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

// Calculate fusion cross-section (parameterized formula)
function calculateFusionCrossSection(energy, reactionType) {
  // Energy in keV, cross-section in m²
  const E = energy;
  
  if (reactionType === 'dt_fusion') {
    // D-T fusion cross-section (peak around 100 keV)
    const S = 5.5e-22; // astrophysical S-factor
    const gamow = Math.sqrt(31.4 / E);
    return S / E * Math.exp(-19.94 * gamow) * 1e-28;
  } else if (reactionType === 'dd_fusion_he3' || reactionType === 'dd_fusion_t') {
    // D-D fusion (peaks around 1000 keV)
    const S = 0.055e-22;
    const gamow = Math.sqrt(31.4 / E);
    return S / E * Math.exp(-19.94 * gamow) * 1e-29;
  } else if (reactionType === 'dhe3_fusion') {
    // D-He3 fusion (peaks around 200 keV)
    const S = 5.0e-22;
    const gamow = Math.sqrt(68.7 / E);
    return S / E * Math.exp(-31.4 * gamow) * 1e-29;
  } else if (reactionType === 'pb_fusion') {
    // p-B11 fusion (peaks around 600 keV)
    const S = 0.2e-22;
    const gamow = Math.sqrt(137 / E);
    return S / E * Math.exp(-35.0 * gamow) * 1e-30;
  }
  return 0;
}

// Calculate fission cross-section
function calculateFissionCrossSection(energy) {
  // Energy in eV, cross-section in barns (1 barn = 1e-28 m²)
  const E = energy;
  
  // U-235 thermal and resonance region
  if (E < 1) {
    // Thermal region (1/v behavior)
    return 580 * Math.sqrt(0.0253 / E);
  } else if (E < 100) {
    // Resonance region (simplified)
    return 10 + 200 * Math.exp(-Math.pow((E - 6.67) / 2, 2));
  } else if (E < 10000) {
    // Fast fission threshold region
    return 1.5 + 0.5 * Math.log(E / 100);
  } else {
    // High energy fission
    return 2.0;
  }
}

function EnergyChart() {
  const mode = useSimulationStore((state) => state.mode);
  const experiments = useSimulationStore((state) => state.experiments);
  
  // Filter experiments by type
  const fissionExperiments = experiments.filter(exp => exp.type === 'fission');
  const fusionExperiments = experiments.filter(exp => exp.type === 'fusion');
  
  // Generate fusion cross-section data (theoretical)
  const fusionEnergyPoints = [];
  for (let i = 1; i <= 1000; i++) {
    fusionEnergyPoints.push(i);
  }
  
  // Prepare experimental data for fusion (real-time)
  const fusionExperimentalData = fusionExperiments.map(exp => {
    // Map each fusion experiment to a probabilistic energy point
    let energyKeV = 100; // Default D-T optimal energy
    let crossSection = calculateFusionCrossSection(energyKeV, exp.reactionId || 'dt_fusion');
    
    // Add some probabilistic variation based on success
    const variation = 0.8 + Math.random() * 0.4; // 80-120% of theoretical
    
    return {
      x: energyKeV * (0.9 + Math.random() * 0.2), // Energy spread
      y: crossSection * variation,
      label: exp.reaction
    };
  });
  
  const fusionData = {
    labels: fusionEnergyPoints,
    datasets: [
      {
        label: 'D-T Fusion (Theory)',
        data: fusionEnergyPoints.map(E => calculateFusionCrossSection(E, 'dt_fusion')),
        borderColor: '#3399ff',
        backgroundColor: 'rgba(51, 153, 255, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        type: 'line'
      },
      {
        label: 'D-D Fusion (Theory)',
        data: fusionEnergyPoints.map(E => calculateFusionCrossSection(E, 'dd_fusion_he3')),
        borderColor: '#ff9933',
        backgroundColor: 'rgba(255, 153, 51, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        type: 'line'
      },
      {
        label: 'D-³He Fusion (Theory)',
        data: fusionEnergyPoints.map(E => calculateFusionCrossSection(E, 'dhe3_fusion')),
        borderColor: '#33cc66',
        backgroundColor: 'rgba(51, 204, 102, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        type: 'line'
      },
      // Experimental data points (real-time)
      {
        label: 'Your Experiments',
        data: fusionExperimentalData,
        borderColor: '#ffff00',
        backgroundColor: 'rgba(255, 255, 0, 0.8)',
        pointRadius: 8,
        pointHoverRadius: 12,
        pointStyle: 'star',
        showLine: false,
        type: 'scatter'
      }
    ]
  };
  
  const fusionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          color: '#ffffff', 
          font: { size: 13, weight: 'bold' },
          usePointStyle: true,
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'Fusion Reaction Cross-Sections vs Energy',
        color: '#00d4ff',
        font: { size: 18, weight: 'bold' },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y.toExponential(2) + ' m²';
          }
        }
      }
    },
    scales: {
      y: {
        type: 'logarithmic',
        title: { 
          display: true, 
          text: 'Cross-section σ in m²', 
          color: '#00ff88', 
          font: { size: 14, weight: 'bold' }
        },
        ticks: { 
          color: '#ffffff',
          callback: function(value) {
            return value.toExponential(0);
          }
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        type: 'logarithmic',
        title: { 
          display: true, 
          text: 'Center of Mass Energy in keV', 
          color: '#00ff88', 
          font: { size: 14, weight: 'bold' }
        },
        ticks: { 
          color: '#ffffff',
          callback: function(value) {
            return value;
          }
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };
  
  // Generate fission cross-section data (theoretical)
  const fissionEnergyPoints = [];
  for (let i = 0.01; i <= 10000; i *= 1.1) {
    fissionEnergyPoints.push(i);
  }
  
  // Prepare experimental data for fission (real-time)
  const fissionExperimentalData = fissionExperiments.map(exp => {
    // Thermal neutron energy (most fissions occur here)
    const energyEV = 0.0253 + (Math.random() - 0.5) * 0.02; // Around thermal
    const crossSection = calculateFissionCrossSection(energyEV);
    
    // Add probabilistic variation
    const variation = 0.85 + Math.random() * 0.3; // 85-115% of theoretical
    
    return {
      x: energyEV,
      y: crossSection * variation,
      label: exp.products
    };
  });
  
  const fissionData = {
    labels: fissionEnergyPoints,
    datasets: [
      {
        label: 'U-235 Fission (Theory)',
        data: fissionEnergyPoints.map(E => calculateFissionCrossSection(E)),
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        type: 'line'
      },
      // Experimental data points (real-time)
      {
        label: 'Your Experiments',
        data: fissionExperimentalData,
        borderColor: '#ffff00',
        backgroundColor: 'rgba(255, 255, 0, 0.8)',
        pointRadius: 8,
        pointHoverRadius: 12,
        pointStyle: 'star',
        showLine: false,
        type: 'scatter'
      }
    ]
  };
  
  const fissionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          color: '#ffffff', 
          font: { size: 13, weight: 'bold' },
          usePointStyle: true,
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'U-235 Fission Cross-Section vs Neutron Energy',
        color: '#00d4ff',
        font: { size: 18, weight: 'bold' },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return 'σ = ' + context.parsed.y.toFixed(2) + ' barns';
          }
        }
      }
    },
    scales: {
      y: {
        type: 'logarithmic',
        title: { 
          display: true, 
          text: 'Cross-section σ in barns', 
          color: '#00ff88', 
          font: { size: 14, weight: 'bold' }
        },
        ticks: { 
          color: '#ffffff',
          callback: function(value) {
            return value.toFixed(0);
          }
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        min: 0.1,
        max: 1000
      },
      x: {
        type: 'logarithmic',
        title: { 
          display: true, 
          text: 'Neutron Energy in eV', 
          color: '#00ff88', 
          font: { size: 14, weight: 'bold' }
        },
        ticks: { 
          color: '#ffffff',
          callback: function(value) {
            return value.toFixed(2);
          }
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };
  
  return (
    <div className="energy-chart-container">
      <div className="chart-header">
        <h2>Nuclear Reaction Cross-Sections</h2>
        <p className="chart-subtitle">
          {mode === 'fission' 
            ? 'U-235 Fission probability vs neutron energy'
            : 'Fusion reaction probabilities vs center-of-mass energy'}
        </p>
      </div>
      
      <div className="chart-box-single">
        {mode === 'fission' ? (
          <Line data={fissionData} options={fissionOptions} />
        ) : (
          <Line data={fusionData} options={fusionOptions} />
        )}
      </div>
    </div>
  );
}

export default EnergyChart;
