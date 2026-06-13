from pydantic import BaseModel, Field
from datetime import datetime

class TransactionInput(BaseModel):
    transaction_id: str
    sender_upi: str
    receiver_upi: str
    amount: float = Field(..., gt=0)
    transaction_type: str
    timestamp: datetime

class PredictionResponse(BaseModel):
    transaction_id: str
    fraud_probability: float
    is_fraud: bool
    risk_level: str