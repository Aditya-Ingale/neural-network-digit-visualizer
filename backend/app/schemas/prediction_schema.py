from pydantic import BaseModel
from typing import List

class PredictionRequest(BaseModel):
    image: List[float]

class PredictionResponse(BaseModel):
    probabilities: List[float]
    predicted_digit: int
    confidence: float