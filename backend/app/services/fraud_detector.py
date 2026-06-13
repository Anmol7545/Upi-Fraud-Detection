import pickle
import numpy as np
import os
from app.services.feature_engine import FeatureEngine

MODEL_PATH = "/home/anmol-mishra/Desktop/upi-fraud-detection/ml/models/fraud_model.pkl"
SCALER_PATH = "/home/anmol-mishra/Desktop/upi-fraud-detection/ml/models/scaler.pkl"

class FraudDetector:
    def __init__(self):
        self.feature_engine = FeatureEngine()
        self.model = None
        self.scaler = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            with open(MODEL_PATH, "rb") as f:
                self.model = pickle.load(f)
            with open(SCALER_PATH, "rb") as f:
                self.scaler = pickle.load(f)
            print("✅ Model loaded successfully")
        else:
            print("⚠️ Model not found - dummy mode")

    def predict(self, transaction: dict) -> dict:
        if self.model is None:
            return {
                "fraud_probability": 0.0,
                "is_fraud": False,
                "risk_level": "LOW",
                "top_features": []
            }
        features = self.feature_engine.extract(transaction)
        feature_array = np.array(features["values"]).reshape(1, -1)
        scaled = self.scaler.transform(feature_array)
        prob = self.model.predict_proba(scaled)[0][1]
        return {
            "fraud_probability": round(float(prob), 4),
            "is_fraud": bool(prob > 0.5),
            "risk_level": self._risk_level(prob),
            "top_features": []
        }

    def _risk_level(self, prob: float) -> str:
        if prob < 0.3: return "LOW"
        if prob < 0.6: return "MEDIUM"
        if prob < 0.85: return "HIGH"
        return "CRITICAL"