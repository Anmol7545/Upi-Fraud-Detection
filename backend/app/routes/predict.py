from fastapi import APIRouter, HTTPException
from app.schemas.transaction import TransactionInput, PredictionResponse
from app.services.fraud_detector import FraudDetector

router = APIRouter()
detector = FraudDetector()

@router.post("/predict", response_model=PredictionResponse)
async def predict_fraud(transaction: TransactionInput):
    try:
        result = detector.predict(transaction.dict())
        return PredictionResponse(
            transaction_id=transaction.transaction_id,
            fraud_probability=result["fraud_probability"],
            is_fraud=result["is_fraud"],
            risk_level=result["risk_level"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))