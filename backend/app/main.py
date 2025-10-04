from fastapi import FastAPI
from app.api.routes import auth,user,fraud,health
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(title=settings.project_name)
origins = [
    "http://localhost:5173", 
     "http://localhost:8000", # Vite
    
    # "http://127.0.0.1:5173",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use the API prefix from settings
app.include_router(auth.router, prefix=f"{settings.api_v1_str}/auth", tags=["auth"])
app.include_router(fraud.router, prefix=f"{settings.api_v1_str}/fraud", tags=["fraud"])
app.include_router(user.router, prefix=f"{settings.api_v1_str}/user", tags=["user"])
app.include_router(health.router,prefix=f"{settings.api_v1_str}/health",tags=["health"])

