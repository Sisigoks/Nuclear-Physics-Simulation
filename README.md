# Nuclear Physics Investigatory Study
## Interactive Fission & Fusion Simulation with React Three Fiber

A comprehensive 3D physics simulation designed for investigatory studies in nuclear physics, featuring multiple reaction types, realistic calculations, and data export capabilities.

## 🔬 Key Features for Investigatory Studies

### **Multiple Nuclear Fission Reactions**
Simulate **6 different U-235 fission pathways** with varying products:
- **U-235 + n → Ba-141 + Kr-92 + 3n** (202.5 MeV, 6.0% probability)
- **U-235 + n → Xe-140 + Sr-94 + 2n** (198.7 MeV, 6.3% probability)
- **U-235 + n → I-137 + Y-97 + 2n** (196.4 MeV, 5.8% probability)
- **U-235 + n → Cs-144 + Rb-90 + 2n** (200.1 MeV, 5.5% probability)
- **U-235 + n → Te-134 + Zr-100 + 2n** (199.3 MeV, 6.1% probability)
- **U-235 + n → La-147 + Br-87 + 2n** (197.8 MeV, 4.2% probability)

**Key Observations:**
- Neutron bombards from **top** (visible from all angles)
- **Fission product atoms remain intact** after collision
- Each product atom moves as a coherent unit
- Neutrons are **ejected separately** from the splitting nucleus
- Color-coded products for easy identification

### **Multiple Nuclear Fusion Reactions**
Study **5 different fusion pathways** with varying conditions:
- **Deuterium-Tritium (D-T)**: 17.6 MeV, 100M K, highest cross-section
- **Deuterium-Deuterium (D-D → He-3)**: 3.27 MeV, 400M K
- **Deuterium-Deuterium (D-D → T)**: 4.03 MeV, 400M K
- **Deuterium-Helium-3 (D-He3)**: 18.3 MeV, 500M K
- **Proton-Boron-11 (p-B11)**: 8.7 MeV, 3000M K (aneutronic)

**Advanced Features:**
- Visible nuclei approaching each other
- Coulomb barrier calculations displayed
- Temperature requirements shown
- Product particles clearly visible and labeled

### **Realistic Physics Calculations**
- **Q-value calculations** using Einstein's E=mc²
- **Coulomb barrier** calculations for fusion reactions
- **Binding energy** considerations
- **Mass-energy equivalence** throughout
- **Conservation laws** (mass-energy, momentum, charge)

### **Data Collection & Export**
Perfect for investigatory projects:
- **Real-time experiment tracking**
- **CSV export** for spreadsheet analysis
- **JSON export** for programming analysis
- **Detailed reaction information** including:
  - Timestamp
  - Reaction type
  - Products formed
  - Energy released
  - Additional physics parameters

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open in browser**:
- The app will automatically open at `http://localhost:3000`
- Or manually navigate to the URL shown in terminal

4. **Build for production** (optional):
```bash
npm run build
npm run preview
```

## 📊 How to Use for Investigatory Study

### Conducting Fission Experiments

1. **Select Simulation Mode**: Click "Nuclear Fission"
2. **Choose Reaction Type**: Use dropdown to select different U-235 fission pathways
3. **Observe Initial State**: U-235 nucleus displayed with correct proton/neutron ratio
4. **Bombard Neutron**: Click "Bombard Neutron (Top)" button
5. **Watch Collision**: Neutron falls from above and strikes nucleus
6. **Observe Products**:
   - Two intact product atoms move apart
   - Multiple neutrons ejected separately
   - Product labels and colors displayed
7. **Record Data**: Experiment automatically logged in data table
8. **Repeat**: Reset and try different reaction pathways

### Conducting Fusion Experiments

1. **Select Simulation Mode**: Click "Nuclear Fusion"
2. **Choose Reaction Type**: Select from D-T, D-D, D-He3, or p-B11 fusion
3. **Start Fusion**: Click "Start Fusion" to begin approach
4. **Observe Approach**: Watch nuclei move toward each other
5. **Trigger Fusion**: Click "Trigger Fusion" when close
6. **Watch Reaction**:
   - Bright fusion flash
   - Product particles ejected
   - Energy and barrier information displayed
7. **Record Data**: Experiment automatically logged
8. **Compare**: Try different fusion types to compare energy yields

### Analyzing Data

1. **View Summary Statistics**: See total experiments, energy released, averages
2. **Examine Data Table**: Review all experiments with timestamps
3. **Export Data**:
   - **CSV format**: Open in Excel/Google Sheets for graphs
   - **JSON format**: Process with Python/JavaScript for analysis
4. **Study Notes**: Review physics principles in the notes section

## 🧪 Investigatory Study Ideas

### Comparative Studies
- Compare energy yields across different fission pathways
- Analyze relationship between product masses and energy release
- Study neutron production rates in different reactions
- Compare fusion vs fission energy per nucleon

### Quantitative Analysis
- Calculate mass defect for each reaction
- Verify energy conservation (E=mc²)
- Plot energy vs reaction probability
- Analyze Coulomb barrier vs temperature requirements

### Advanced Projects
- Model chain reaction scenarios
- Calculate critical mass requirements
- Compare different fusion fuel cycles
- Analyze energy return on investment for different reactions

## 🎯 Physics Principles Demonstrated

### Nuclear Fission
- **Mass-Energy Equivalence**: E = mc²
- **Binding Energy**: Products have higher binding energy per nucleon
- **Conservation Laws**: Mass-energy, momentum, and charge conserved
- **Neutron Multiplication**: Each fission releases 2-3 neutrons
- **Product Distribution**: Various possible fission fragments

### Nuclear Fusion
- **Coulomb Barrier**: Electrostatic repulsion must be overcome
- **Strong Nuclear Force**: Attractive at very short distances
- **Temperature Requirements**: Kinetic energy needed to overcome barrier
- **Cross-Section**: Probability of fusion varies with energy
- **Aneutronic Fusion**: Some reactions produce no neutrons (p-B11)

## 🛠 Technical Stack

- **React 18**: Modern UI framework
- **React Three Fiber**: 3D rendering with Three.js
- **@react-three/drei**: Useful 3D helpers
- **Zustand**: State management
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with gradients and animations

## 📱 Browser Support

- **Chrome/Edge**: 90+ (Recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **WebGL Required**: For 3D rendering

## 🎓 Educational Standards Alignment

This simulation supports learning objectives in:
- Nuclear Physics
- Quantum Mechanics
- Energy Conservation
- Mass-Energy Equivalence
- Chemical/Physical Reactions
- Data Analysis & Scientific Method

## 📄 Data Export Format

### CSV Export
```
Timestamp, Type, Reaction, Energy (MeV), Products
2025-01-05 10:30:15, fission, U-235, 202.5, Ba-141 + Kr-92 + 3n
```

### JSON Export
```json
{
  "experiments": [...],
  "summary": {
    "totalExperiments": 10,
    "totalEnergyReleased": 1523.4
  }
}
```

## 🔧 Troubleshooting

**Issue**: Fusion nuclei not visible
- **Solution**: Now fully visible with React Three Fiber implementation

**Issue**: Performance slow
- **Solution**: Particle count optimized, reduce browser tabs

**Issue**: npm install fails
- **Solution**: Use Node.js v16+, clear npm cache: `npm cache clean --force`

## 👨‍🔬 For Educators & Students

This tool is specifically designed for:
- High school physics projects
- University nuclear physics labs
- Independent investigatory studies
- Science fair demonstrations
- Research paper visualizations

## 📚 References & Further Reading

- Nuclear binding energy curves
- Fission product yield distributions
- Fusion cross-section data
- Coulomb barrier calculations
- Q-value derivations

## 📧 Support

For questions about using this tool in your investigatory study, refer to the physics principles in the application or consult nuclear physics textbooks.

## 🎉 Credits

Created as an educational tool for nuclear physics investigatory studies. All physics calculations based on established nuclear data and equations.

## ⚖️ License

MIT License - Free for educational use
