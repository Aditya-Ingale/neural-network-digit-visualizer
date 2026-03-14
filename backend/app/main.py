from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

model = load_model()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    result = predict_digit(model, request.image)
    return result