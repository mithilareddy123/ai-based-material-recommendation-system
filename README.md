# AI-Based Material Recommendation System

An end-to-end intelligent material recommendation platform that predicts suitable materials for specific industrial use cases based on environment, strength, durability, eco-preferences, and more. The system integrates ML models with LLM-based analysis to assist engineers and manufacturers in sustainable material selection.

---

## Features

- Predicts top 3 suitable materials from 22 options using machine learning.
- Integrated with Gemini LLM for detailed analysis, cost comparison, and insights.
- Tracked and logged experiments using MLflow.
- Frontend deployed with **Vercel**, backend deployed with **Docker + AWS EC2**.
- Model, encoder, and scaler saved using `pickle` for reproducible inference.

---

## Dataset Overview

- **Total Data Points**: 1050+
- **Columns**:
  - `Environment`
  - `Required_Strength`
  - `Durability_Priority`
  - `Eco_Preference`
  - `Application_Area`
  - `Max_Lead_Time`
  - `Material_Name` (target)

---

## ML Workflow

1. **Data Collection & Preprocessing**  
   Cleaned and preprocessed data (handled nulls, outliers, encoded categorical, scaled numerical).

2. **Model Training with MLflow**  
   Evaluated multiple models (Random Forest, Decision Tree, KNN, etc.). Logged runs and metrics using MLflow.

3. **Best Model**  
   Random Forest with ~84% accuracy selected. Saved:
   - `model.pkl`
   - `scaler.pkl`
   - `encoder.pkl`

4. **LLM Integration**  
   Top 3 predicted materials passed to **Gemini LLM** via prompt to get:
   - Ranked recommendation
   - Competitor analysis
   - Cost and performance remarks

---

## Tech Stack

| Component        | Tech Used                      |
|------------------|-------------------------------|
| ML Model         | Scikit-learn (RandomForest)    |
| Experiment and Tracking | MLflow                         |
| Backend          | Flask                          |
| Frontend         | React + Vercel                 |
| LLM Integration  | Gemini API                     |
| Deployment       | Render (Backend), Vercel (Frontend) |

---

## Project Architecture
![Image](https://github.com/user-attachments/assets/d9a2c533-dae1-4b52-8209-a2e503ada5a9)

---

## Local Setup Instructions

### Backend

```bash
git clone https://github.com/katakampranav/AI-Based-Material-Recommendation-System
cd server
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Docker Deployment (Backend)

```bash
# Build image
docker build -t material-recommender .

# Run container
docker run -d -p 8000:8000 material-recommender
```

---

## 🌍 Live Deployment

* **Frontend**: [https://ai-based-material-recommendation-system.vercel.app/](https://ai-based-material-recommendation-system.vercel.app/)
* **Backend**: Hosted on Render

---

## Acknowledgements

* Gemini API for intelligent analysis
* AWS EC2 for scalable backend hosting
* Vercel for frontend deployment
* MLflow for streamlined experiment tracking

---

