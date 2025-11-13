
from dotenv import load_dotenv
load_dotenv()
import warnings
import os
warnings.filterwarnings("ignore", message=".*pkg_resources.*")
from fastapi import FastAPI
from app.api.routes import auth,user,fraud,health, legal,admin
from transformers import logging as hf_logging
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.db import engine, Base
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings("ignore", category=FutureWarning)
hf_logging.set_verbosity_error()
import tensorflow as tf
tf.get_logger().setLevel('ERROR')

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
app.include_router(legal.router,prefix=f"{settings.api_v1_str}/legal",tags=["legal"])
app.include_router(admin.router,prefix=f"{settings.api_v1_str}/admin",tags=["admin"])

