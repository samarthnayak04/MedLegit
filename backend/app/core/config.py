from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # Database
    database_url: str = Field(..., description="PostgreSQL connection URL")
    
    # JWT Settings
    secret_key: str = Field(..., description="JWT secret key")
    algorithm: str = Field(..., description="JWT signing algorithm")
    access_token_expire_minutes: int = Field(..., description="Access token expiration in minutes")
    
    # Security
    bcrypt_rounds: int = Field(..., description="Bcrypt salt rounds")
    
    # API Settings
    api_v1_str: str = Field(..., description="Base API prefix")
    project_name: str = Field(..., description="Project name")
    
    # Pydantic Settings Configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

settings = Settings()
