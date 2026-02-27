from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.model.model_loader import load_model
from app.services.inference_service import predict_digit
from app.schemas.prediction_schema import (
    PredictionRequest,
    PredictionResponse
)

app = FastAPI(title="Nural Network Digit Visualizer API")

# Enable CORS (important for React later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Later restrict in prediction
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
model = load_model()

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    result = predict_digit(model, request.image)
    return result