from sqlalchemy import Column, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Transaction(Base):
    _tablename_="transactions"
    
    id = Column(String, primary_key=True)
    sender_upi = Column(String)
    reciever_upi = Column(String)
    amount = Column(Float)
    transaction_type = Column(String)
    fraud_probability = Column(Float)
    is_fraud = Column(Boolean)
    risk_level = Column(String)
    created_at = Column(DateTime, server_default=func.now())