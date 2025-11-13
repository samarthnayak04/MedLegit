from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut, Token,UserLogin
from app.models.user import User
from app.crud import user as crud_user
from app.core.db import get_db
from app.core.security import create_access_token, create_refresh_token, verify_token

router = APIRouter()


# -------------------------
# SIGNUP ROUTE
# -------------------------
@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud_user.create_user(db, user.email, user.password,user.first_name,user.last_name)
    return new_user


# -------------------------
# LOGIN ROUTE
# -------------------------
@router.post("/login", response_model=Token)
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, user.email)
    if not db_user or not crud_user.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create access & refresh tokens
    access_token = create_access_token({"sub": str(db_user.id)})
    refresh_token = create_refresh_token({"sub": str(db_user.id)})

    # -------------------------
    # SET REFRESH TOKEN COOKIE
    # -------------------------
    # For LOCAL testing:
    # - set secure=False (otherwise cookie won't be sent over http)
    # For PRODUCTION:
    # - set secure=True
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=7 * 24 * 60 * 60,  # 7 days
        samesite="Lax",   # change to "none" in production
        secure=False,
        path="/",     # <-- change to True in production
    )

    # Return access token (and refresh token optionally for Postman/dev testing)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,  # optional, remove in production
        # "first_name": db_user.first_name,
        # "last_name": db_user.last_name,
        "token_type": "bearer"
    }


# -------------------------
# REFRESH ROUTE
# -------------------------
@router.post("/refresh")
async def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    # 1. Get refresh token from cookie
    refresh_token = request.cookies.get("refresh_token")

    # 1a. For Postman testing (optional)
    # if not refresh_token:
    #     try:
    #         body = await request.json()
    #         refresh_token = body.get("refresh_token")
    #     except Exception:
    #         pass

    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    # 2. Verify token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        user_id = verify_token(refresh_token, credentials_exception)
    except Exception:
        raise credentials_exception

    # 3. Check user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception

    # 4. Issue new access token
    access_token = create_access_token({"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}


# -------------------------
# LOGOUT ROUTE
# -------------------------
@router.post("/logout")
def logout(response: Response):
    # Delete cookie
    response.delete_cookie(
        key="refresh_token", 
        path="/",
        samesite="None", # 🔹 In production with frontend on a different domain, set this to 'None'
        secure=False,       # 🔹 In production: set to True to ensure cookie is sent only over HTTPS
        httponly=True          # Optional, but recommended for security
    )

    return {"msg": "Logged out"}
