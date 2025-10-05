import { useState } from 'react';
import useSimulationStore from '../store/useSimulationStore';
import './DataPanel.css';

function DataPanel() {
  const { experiments, exportData, clearExperiments } = useSimulationStore();
  const [showTable, setShowTable] = useState(true);
  
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuclear-physics-study-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Type', 'Reaction', 'Energy (MeV)', 'Products'];
    const rows = experiments.map(exp => [
      new Date(exp.timestamp).toLocaleString(),
      exp.type,
      exp.reaction || exp.fuel,
      exp.energy,
      exp.products
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuclear-physics-study-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const totalEnergy = experiments.reduce((sum, exp) => sum + exp.energy, 0);
  const fissionCount = experiments.filter(exp => exp.type === 'fission').length;
  const fusionCount = experiments.filter(exp => exp.type === 'fusion').length;
  const avgEnergy = experiments.length > 0 ? (totalEnergy / experiments.length).toFixed(2) : 0;
  
  return (
    <div className="data-panel">
      <div className="data-header">
        <h2>Investigatory Study Data</h2>
        <button
          className="toggle-btn"
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? '▼' : '▶'} {showTable ? 'Hide' : 'Show'} Data
        </button>
      </div>
      
      {showTable && (
        <>
          {/* Summary Statistics */}
          <div className="data-summary">
            <div className="stat-card">
              <div className="stat-label">Total Experiments</div>
              <div className="stat-value">{experiments.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Fission Events</div>
              <div className="stat-value">{fissionCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Fusion Events</div>
              <div className="stat-value">{fusionCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Energy</div>
              <div className="stat-value">{totalEnergy.toFixed(2)} MeV</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Average Energy</div>
              <div className="stat-value">{avgEnergy} MeV</div>
            </div>
          </div>
          
          {/* Experiments Table */}
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Reaction</th>
                  <th>Products</th>
                  <th>Energy (MeV)</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {experiments.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                      No experiments recorded yet. Perform fission or fusion reactions to collect data.
                    </td>
                  </tr>
                ) : (
                  experiments.slice().reverse().map((exp, index) => (
                    <tr key={exp.id} className={`experiment-row ${exp.type}`}>
                      <td>{experiments.length - index}</td>
                      <td>{new Date(exp.timestamp).toLocaleTimeString()}</td>
                      <td>
                        <span className={`type-badge ${exp.type}`}>
                          {exp.type.toUpperCase()}
                        </span>
                      </td>
                      <td>{exp.reaction || exp.fuel}</td>
                      <td>{exp.products}</td>
                      <td className="energy-cell">{exp.energy}</td>
                      <td>
                        {exp.type === 'fission' && (
                          <span className="detail-text">
                            {exp.neutronsReleased}n released
                          </span>
                        )}
                        {exp.type === 'fusion' && exp.coulombBarrier && (
                          <span className="detail-text">
                            Barrier: {exp.coulombBarrier} MeV
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Export Controls */}
          <div className="data-controls">
            <button
              className="export-btn"
              onClick={handleExportCSV}
              disabled={experiments.length === 0}
            >
              Export as CSV
            </button>
            <button
              className="export-btn"
              onClick={handleExport}
              disabled={experiments.length === 0}
            >
              Export as JSON
            </button>
            <button
              className="clear-btn"
              onClick={clearExperiments}
              disabled={experiments.length === 0}
            >
              Clear All Data
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DataPanel;
