from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated # Recommended for modern type hinting

from .config import settings

# --- JWT Configuration and Scheme ---
# This tells FastAPI to expect a token in the 'Authorization' header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.api_v1_str}/auth/token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    # Your existing, corrected create_access_token function
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + \
             (expires_delta if expires_delta else timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

# --- JWT Decoding and Verification ---
def verify_token(token: str, credentials_exception):
    try:
        # 1. Decode the token using the secret key
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        
        # 2. Extract the subject (user ID)
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
        # IMPORTANT: Return the user ID (or a dictionary containing it)
        return int(user_id) 
        
    except JWTError:
        raise credentials_exception

# --- FastAPI Dependency (The Function You Were Missing) ---
def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Dependency that returns the authenticated user's ID (int)."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # The verify_token function returns the user ID (int) upon success
    return verify_token(token, credentials_exception)