from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./upifraud.db"
    SECRET_KEY: str = "upi-fraud-secret-key-2024"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MODEL_PATH: str = "./fraud_model.pkl"
    SCALER_PATH: str = "./scaler.pkl"

    class Config:
        env_file = ".env"

settings = Settings()