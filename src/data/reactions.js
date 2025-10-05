// Nuclear Fission Reactions - Multiple possible outcomes for U-235
export const FISSION_REACTIONS = [
  {
    id: 'u235_ba141_kr92',
    fuel: 'U-235',
    products: [
      { symbol: 'Ba-141', name: 'Barium-141', protons: 56, neutrons: 85, mass: 141, color: '#ff6600' },
      { symbol: 'Kr-92', name: 'Krypton-92', protons: 36, neutrons: 56, mass: 92, color: '#00cc66' }
    ],
    neutronsReleased: 3,
    energy: 202.5, // MeV
    probability: 6.0 // %
  },
  {
    id: 'u235_xe140_sr94',
    fuel: 'U-235',
    products: [
      { symbol: 'Xe-140', name: 'Xenon-140', protons: 54, neutrons: 86, mass: 140, color: '#9966ff' },
      { symbol: 'Sr-94', name: 'Strontium-94', protons: 38, neutrons: 56, mass: 94, color: '#ff3366' }
    ],
    neutronsReleased: 2,
    energy: 198.7,
    probability: 6.3
  },
  {
    id: 'u235_i137_y97',
    fuel: 'U-235',
    products: [
      { symbol: 'I-137', name: 'Iodine-137', protons: 53, neutrons: 84, mass: 137, color: '#cc00ff' },
      { symbol: 'Y-97', name: 'Yttrium-97', protons: 39, neutrons: 58, mass: 97, color: '#00ffcc' }
    ],
    neutronsReleased: 2,
    energy: 196.4,
    probability: 5.8
  },
  {
    id: 'u235_cs144_rb90',
    fuel: 'U-235',
    products: [
      { symbol: 'Cs-144', name: 'Cesium-144', protons: 55, neutrons: 89, mass: 144, color: '#ffcc00' },
      { symbol: 'Rb-90', name: 'Rubidium-90', protons: 37, neutrons: 53, mass: 90, color: '#ff6699' }
    ],
    neutronsReleased: 2,
    energy: 200.1,
    probability: 5.5
  },
  {
    id: 'u235_te134_zr100',
    fuel: 'U-235',
    products: [
      { symbol: 'Te-134', name: 'Tellurium-134', protons: 52, neutrons: 82, mass: 134, color: '#66ccff' },
      { symbol: 'Zr-100', name: 'Zirconium-100', protons: 40, neutrons: 60, mass: 100, color: '#ff9933' }
    ],
    neutronsReleased: 2,
    energy: 199.3,
    probability: 6.1
  },
  {
    id: 'u235_la147_br87',
    fuel: 'U-235',
    products: [
      { symbol: 'La-147', name: 'Lanthanum-147', protons: 57, neutrons: 90, mass: 147, color: '#ffaa00' },
      { symbol: 'Br-87', name: 'Bromine-87', protons: 35, neutrons: 52, mass: 87, color: '#cc6600' }
    ],
    neutronsReleased: 2,
    energy: 197.8,
    probability: 4.2
  }
];

// Nuclear Fusion Reactions - Different types
export const FUSION_REACTIONS = [
  {
    id: 'dt_fusion',
    name: 'Deuterium-Tritium Fusion',
    reactants: [
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' },
      { symbol: 'T', name: 'Tritium', protons: 1, neutrons: 2, mass: 3, color: '#6633ff' }
    ],
    products: [
      { symbol: 'He-4', name: 'Helium-4', protons: 2, neutrons: 2, mass: 4, color: '#ffff00' },
      { symbol: 'n', name: 'Neutron', protons: 0, neutrons: 1, mass: 1, color: '#00ffff' }
    ],
    energy: 17.6, // MeV
    temperature: 100, // million Kelvin
    crossSection: 5.0 // barns at 100 keV
  },
  {
    id: 'dd_fusion_he3',
    name: 'Deuterium-Deuterium Fusion (He-3)',
    reactants: [
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' },
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' }
    ],
    products: [
      { symbol: 'He-3', name: 'Helium-3', protons: 2, neutrons: 1, mass: 3, color: '#ffdd00' },
      { symbol: 'n', name: 'Neutron', protons: 0, neutrons: 1, mass: 1, color: '#00ffff' }
    ],
    energy: 3.27,
    temperature: 400,
    crossSection: 0.05
  },
  {
    id: 'dd_fusion_t',
    name: 'Deuterium-Deuterium Fusion (Tritium)',
    reactants: [
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' },
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' }
    ],
    products: [
      { symbol: 'T', name: 'Tritium', protons: 1, neutrons: 2, mass: 3, color: '#6633ff' },
      { symbol: 'p', name: 'Proton', protons: 1, neutrons: 0, mass: 1, color: '#ff3333' }
    ],
    energy: 4.03,
    temperature: 400,
    crossSection: 0.05
  },
  {
    id: 'dhe3_fusion',
    name: 'Deuterium-Helium-3 Fusion',
    reactants: [
      { symbol: 'D', name: 'Deuterium', protons: 1, neutrons: 1, mass: 2, color: '#3366ff' },
      { symbol: 'He-3', name: 'Helium-3', protons: 2, neutrons: 1, mass: 3, color: '#ffdd00' }
    ],
    products: [
      { symbol: 'He-4', name: 'Helium-4', protons: 2, neutrons: 2, mass: 4, color: '#ffff00' },
      { symbol: 'p', name: 'Proton', protons: 1, neutrons: 0, mass: 1, color: '#ff3333' }
    ],
    energy: 18.3,
    temperature: 500,
    crossSection: 0.8
  },
  {
    id: 'pb_fusion',
    name: 'Proton-Boron-11 Fusion',
    reactants: [
      { symbol: 'p', name: 'Proton', protons: 1, neutrons: 0, mass: 1, color: '#ff3333' },
      { symbol: 'B-11', name: 'Boron-11', protons: 5, neutrons: 6, mass: 11, color: '#00cc99' }
    ],
    products: [
      { symbol: '3α', name: '3 Helium-4', protons: 6, neutrons: 6, mass: 12, color: '#ffff00' }
    ],
    energy: 8.7,
    temperature: 3000,
    crossSection: 0.001,
    special: 'aneutronic' // No neutrons produced
  }
];

// Physics constants
export const PHYSICS_CONSTANTS = {
  ATOMIC_MASS_UNIT: 931.494, // MeV/c²
  COULOMB_BARRIER_FACTOR: 1.44, // MeV·fm
  STRONG_FORCE_RANGE: 2.0, // fm (femtometers)
  NEUTRON_MASS: 939.565, // MeV/c²
  PROTON_MASS: 938.272, // MeV/c²
  BINDING_ENERGY_PER_NUCLEON: {
    U235: 7.59, // MeV
    He4: 7.07,
    Fe56: 8.79 // Peak of binding energy curve
  }
};

// Calculate Q-value (energy released) for a reaction
export function calculateQValue(reactants, products) {
  const reactantMass = reactants.reduce((sum, r) => sum + r.mass, 0);
  const productMass = products.reduce((sum, p) => sum + p.mass, 0);
  const massDiff = reactantMass - productMass;
  return massDiff * PHYSICS_CONSTANTS.ATOMIC_MASS_UNIT;
}

// Calculate Coulomb barrier for fusion
export function calculateCoulombBarrier(reactant1, reactant2) {
  const Z1 = reactant1.protons;
  const Z2 = reactant2.protons;
  const A1 = reactant1.mass;
  const A2 = reactant2.mass;
  
  // Nuclear radii in fm
  const r1 = 1.2 * Math.pow(A1, 1/3);
  const r2 = 1.2 * Math.pow(A2, 1/3);
  const distance = r1 + r2;
  
  // Coulomb barrier in MeV
  return PHYSICS_CONSTANTS.COULOMB_BARRIER_FACTOR * Z1 * Z2 / distance;
}

// Calculate kinetic energy needed for fusion (Gamow energy)
export function calculateGamowEnergy(temperature) {
  const kT = temperature * 8.617e-2; // Convert K to keV
  return kT;
}
