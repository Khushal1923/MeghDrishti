# MeghDrishti — Panchayat Weather Intelligence & Crop Advisory Platform

**Organization:** Ministry of Earth Sciences / India Meteorological Department (IMD)

---

## 🌟 Quick Start Guide

### 1. Launch Next.js Dashboard Frontend
```bash
# Install dependencies (if not already installed)
npm install

# Start Next.js Development Server
npm run dev
# Visit: http://localhost:3000
```

### 2. Launch FastAPI Inference Backend
```bash
# Start FastAPI backend server
python server.py
# API Docs: http://localhost:8000/docs
```

---

## 📊 Endpoints Overview

- `GET /panchayats`: Retrieve all 13 panchayat hubs with microclimate, elevation, soil properties, and trust scores.
- `POST /predict`: Generate localized downscaling predictions with 90% calibrated uncertainty intervals and trust explanations.
- `GET /scorecard`: Retrieve multi-zone, lead-time stratified validation metrics and skill benchmarks.
- `GET /model-comparison`: Compare Raw NWP vs Bias Correction vs Ridge vs Random Forest vs LightGBM.
- `GET /advisories`: Generate multilingual crop advisories in English, Marathi (मराठी), and Hindi (हिन्दी).
- `GET /model-health`: System telemetry and operational quality check status.

---

## 🧪 Scientific Validation Summary

- **Baseline Raw NWP MAE:** 1.6796 mm
- **MeghDrishti LightGBM MAE:** **0.6301 mm (+62.5% Error Reduction)**
- **Critical Success Index (CSI):** **0.725** (vs Baseline CSI 0.443)
- **Prediction Interval Coverage:** **96.73%** on unseen holdout test data
- **Trust Score Calibration:** High Trust (&ge; 0.75), Medium (0.50–0.74), Low (&lt; 0.50)
