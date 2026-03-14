from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import traceback
import sys

from app.model.model_loader import load_model
from app.services.inference_service import predict_digit
from app.schemas.prediction_schema import (
    PredictionRequest,
    PredictionResponse
)

app = FastAPI(title="Neural Network Digit Visualizer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Starting model load...", flush=True)
try:
    model = load_model()
    print("Model loaded successfully!", flush=True)
except Exception as e:
    print(f"ERROR loading model: {e}", flush=True)
    traceback.print_exc()
    sys.exit(1)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    result = predict_digit(model, request.image)
    return result