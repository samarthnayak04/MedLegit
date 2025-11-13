# api/routes/dependencies.py

from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from app.models.user import User
from app.core.db import get_db
from app.core.security import get_current_user

def get_db_user(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return user
def verify_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Forbidden: Admin access only")
    return current_user