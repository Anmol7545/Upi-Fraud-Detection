import math
from datetime import datetime

class FeatureEngine:
    def extract(self, txn: dict) -> dict:
        ts = txn.get("timestamp")
        if isinstance(ts, str):
            ts = datetime.fromisoformat(ts.replace("Z", "+00:00"))
        hour = ts.hour if ts else 12
        amount = float(txn["amount"])
        features = {
            "amount": amount,
            "amount_log": math.log1p(amount),
            "hour": hour,
            "is_weekend": 1 if ts.weekday() >= 5 else 0,
            "is_p2p": 1 if txn["transaction_type"] == "P2P" else 0,
            "is_p2m": 1 if txn["transaction_type"] == "P2M" else 0,
            "amount_gt_10k": 1 if amount > 10000 else 0,
            "amount_gt_50k": 1 if amount > 50000 else 0,
            "is_night": 1 if hour < 6 or hour > 22 else 0,
            "same_bank": 0,
        }
        return {
            "names": list(features.keys()),
            "values": list(features.values())
        }