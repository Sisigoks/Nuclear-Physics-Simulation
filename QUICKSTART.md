# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
The app will automatically open at `http://localhost:3000`

---

## 🧪 Running Your First Experiment

### Fission Experiment (Quick)
1. App opens in **Fission mode** by default
2. Click **"Bombard Neutron (Top)"** button
3. Watch the neutron fall and hit the nucleus
4. Observe the two product atoms and ejected neutrons
5. See data recorded in the table below

### Fusion Experiment (Quick)
1. Click **"Nuclear Fusion"** mode button at top
2. Click **"Start Fusion"** to begin
3. Click **"Trigger Fusion"** when nuclei are close
4. Watch the fusion flash and product ejection
5. Data automatically recorded

---

## 📊 Exporting Data for Your Study

1. Perform several experiments (fission and/or fusion)
2. Scroll to **"Investigatory Study Data"** section
3. Click **"Export as CSV"** for Excel/Sheets
4. Or click **"Export as JSON"** for coding analysis

---

## 🔬 Try Different Reactions

### Fission
Use the **dropdown menu** to select from 6 different U-235 fission pathways:
- Ba-141 + Kr-92 + 3n (202.5 MeV)
- Xe-140 + Sr-94 + 2n (198.7 MeV)
- I-137 + Y-97 + 2n (196.4 MeV)
- And 3 more!

### Fusion
Use the **dropdown menu** to select from 5 fusion reactions:
- D-T Fusion (17.6 MeV) ⭐ Most practical
- D-D Fusion (3.27 or 4.03 MeV)
- D-He3 Fusion (18.3 MeV)
- p-B11 Fusion (8.7 MeV) - No neutrons!

---

## 📝 What Makes This Special

✅ **Fission product atoms stay intact** - Not individual particles flying apart
✅ **Neutrons ejected separately** - Realistic representation
✅ **Neutron comes from top** - Visible from all angles
✅ **Multiple reaction types** - All permutations of U-235 fission
✅ **Fusion fully visible** - React Three Fiber ensures you can see everything
✅ **Data export** - CSV and JSON for your analysis

---

## 🎯 Common Questions

**Q: Why can't I see fusion nuclei in the old version?**
A: The new React Three Fiber version fixes this! Nuclei are now fully visible.

**Q: Do the atoms break apart in fission?**
A: No! The two product atoms (like Ba-141 and Kr-92) remain as intact atoms and move away as units. Only the neutrons are ejected separately.

**Q: How many fission reactions can I simulate?**
A: 6 different U-235 fission pathways with different products and energies.

**Q: How many fusion reactions?**
A: 5 different fusion types including D-T, D-D, D-He3, and p-B11.

**Q: Is the physics realistic?**
A: Yes! All calculations use:
- E=mc² for energy release
- Coulomb barrier calculations
- Real nuclear masses and binding energies
- Conservation laws

---

## 🛠️ Troubleshooting

**Problem**: `npm install` fails
**Solution**: Make sure you have Node.js 16+ installed. Run `node --version` to check.

**Problem**: Port 3000 already in use
**Solution**: The terminal will show an alternate port (like 3001). Use that instead.

**Problem**: Slow performance
**Solution**: Close other browser tabs, or reduce simulation speed with the slider.

---

## 📚 For Your Report

Include these in your investigatory study:
- Screenshots of different reactions
- Exported CSV data with analysis
- Energy comparison graphs
- Discussion of conservation laws
- Coulomb barrier analysis for fusion

---

## 🎓 Need Help?

Check the full README.md for:
- Detailed physics explanations
- Study ideas and analysis suggestions
- Technical architecture
- Educational standards alignment

---

**Ready to start?** Just run `npm run dev` and begin experimenting! 🚀
