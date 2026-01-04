from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# Load model and feature order
model = joblib.load("churn_lgs_model.joblib")

# App config
if os.getenv("ENV") == "production":
    app = FastAPI(docs_url=None, redoc_url=None)
else:
    app = FastAPI()

# Serve static and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# ---------------- Schema ----------------
class CustomerInput(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: int
    Dependents: int
    tenure: int
    PhoneService: int
    MultipleLines: int
    InternetService: str
    OnlineSecurity: int
    OnlineBackup: int
    DeviceProtection: int
    TechSupport: int
    StreamingTV: int
    StreamingMovies: int
    Contract: str
    PaperlessBilling: int
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

# ---------------- Routes ----------------
@app.get("/")
def root():
    return RedirectResponse(url="/web")

@app.get("/web")
def web(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict")
def predict_churn(data: CustomerInput):
    # Convert input to DataFrame
    df = pd.DataFrame([data.model_dump()])

    # Enforce correct column order
    df = df[['gender', 'SeniorCitizen', 'Partner', 'Dependents',
       'tenure', 'PhoneService', 'MultipleLines', 'InternetService',
       'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport',
       'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling',
       'PaymentMethod', 'MonthlyCharges', 'TotalCharges']]

    # Predict
    prob = model.predict_proba(df)[0][1]
    percentage = round(prob * 100, 2)

    if percentage > 60:
        risk = "High"
    elif percentage >= 45:
        risk = "Medium"
    elif percentage >= 35:
        risk = "Low"
    else:
        risk = "Very Low"

    message = f"There is a {percentage}% chance that this customer may churn."

    return {
        "churn_probability": percentage,
        "risk_level": risk,
        "message": message
    }
