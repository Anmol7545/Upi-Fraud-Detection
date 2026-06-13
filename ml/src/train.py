import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

np.random.seed(42)
n = 10000
amount = np.random.exponential(3000, n)
hour = np.random.randint(0, 24, n)
is_night = ((hour < 6) | (hour > 22)).astype(int)
is_weekend = np.random.randint(0, 2, n)
is_p2p = np.random.randint(0, 2, n)
is_p2m = 1 - is_p2p
amount_gt_10k = (amount > 10000).astype(int)
amount_gt_50k = (amount > 50000).astype(int)
same_bank = np.random.randint(0, 2, n)
amount_log = np.log1p(amount)

# Strong fraud rules
fraud = (
    ((amount > 50000) & (is_night == 1)) |
    ((amount > 100000)) |
    ((is_night == 1) & (amount > 20000) & (is_p2p == 1)) |
    ((amount > 30000) & (is_weekend == 1) & (is_night == 1))
).astype(int)

# Add some noise
noise = np.random.random(n) < 0.05
fraud = np.where(noise, 1 - fraud, fraud)

df = pd.DataFrame({
    "amount": amount,
    "amount_log": amount_log,
    "hour": hour,
    "is_weekend": is_weekend,
    "is_p2p": is_p2p,
    "is_p2m": is_p2m,
    "amount_gt_10k": amount_gt_10k,
    "amount_gt_50k": amount_gt_50k,
    "is_night": is_night,
    "same_bank": same_bank,
})

y = fraud

print(f"Fraud rate: {y.mean():.2%}")

X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc = scaler.transform(X_test)

model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
model.fit(X_train_sc, y_train)

print(classification_report(y_test, model.predict(X_test_sc)))

os.makedirs("../models", exist_ok=True)
with open("../models/fraud_model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("../models/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

print("✅ Model saved!")