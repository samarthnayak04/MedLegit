# api/routes/dependencies.py

from sqlalchemy.orm import Session
from fastapi import Depends
from app.core.db import get_db
from app.core.security import get_current_user

def get_db_user(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return user
