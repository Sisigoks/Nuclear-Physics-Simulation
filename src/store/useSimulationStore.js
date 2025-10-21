import { create } from 'zustand';
import { FISSION_REACTIONS, FUSION_REACTIONS } from '../data/reactions';

const useSimulationStore = create((set, get) => ({
  // Mode
  mode: 'fission', // 'fission' or 'fusion'
  
  // Fission state
  selectedFissionReaction: FISSION_REACTIONS[0],
  fissionNucleus: [],
  fissionProducts: [],
  fissionNeutrons: [],
  fissionHasCollided: false,
  
  // Fusion state
  selectedFusionReaction: FUSION_REACTIONS[0],
  fusionReactants: [],
  fusionProducts: [],
  fusionHasFused: false,
  
  // Simulation control
  isPaused: false,
  speed: 2.0,
  theme: 'dark', // 'dark' or 'light'
  
  // Data tracking
  experiments: [],
  currentExperiment: null,
  
  // Actions
  setMode: (mode) => set({ mode }),
  
  setSelectedFissionReaction: (reaction) => set({ selectedFissionReaction: reaction }),
  
  setSelectedFusionReaction: (reaction) => set({ selectedFusionReaction: reaction }),
  
  setFissionNucleus: (nucleus) => set({ fissionNucleus: nucleus }),
  
  setFissionProducts: (products) => set({ fissionProducts: products }),
  
  setFissionNeutrons: (neutrons) => set({ fissionNeutrons: neutrons }),
  
  setFissionHasCollided: (value) => set({ fissionHasCollided: value }),
  
  setFusionReactants: (reactants) => set({ fusionReactants: reactants }),
  
  setFusionProducts: (products) => set({ fusionProducts: products }),
  
  setFusionHasFused: (value) => set({ fusionHasFused: value }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  setSpeed: (speed) => set({ speed }),
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  recordExperiment: (data) => set((state) => ({
    experiments: [...state.experiments, {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    }]
  })),
  
  clearExperiments: () => set({ experiments: [] }),
  
  resetFissionSimulation: () => set({
    fissionNucleus: [],
    fissionProducts: [],
    fissionNeutrons: [],
    fissionHasCollided: false
  }),
  
  resetFusionSimulation: () => set({
    fusionReactants: [],
    fusionProducts: [],
    fusionHasFused: false
  }),
  
  exportData: () => {
    const state = get();
    const data = {
      experiments: state.experiments,
      summary: {
        totalExperiments: state.experiments.length,
        fissionExperiments: state.experiments.filter(e => e.type === 'fission').length,
        fusionExperiments: state.experiments.filter(e => e.type === 'fusion').length,
        totalEnergyReleased: state.experiments.reduce((sum, e) => sum + e.energy, 0),
      }
    };
    return JSON.stringify(data, null, 2);
  }
}));

export default useSimulationStore;
