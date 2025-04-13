from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import chat
import os

app = FastAPI(
    title="Smoothie-Bot API",
    version="0.1.0",
    docs_url="/",
)

# Get allowed origins from environment variable or use default for development
default_origins = "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178,http://localhost:5179,http://localhost:5180,http://localhost:5181"

# Add production URLs to default origins
production_origins = [
    "https://smoothie-bot.vercel.app",  # Main production URL
    "https://www.smoothie-bot.vercel.app",  # With www subdomain
    "https://smoothie-bot-git-main.vercel.app",
    "https://eb-ai-backend.vercel.app"  # Vercel preview URL pattern
]

# Combine default and production origins if ALLOWED_ORIGINS is not set
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", default_origins)
allowed_origins = allowed_origins_str.split(",")

# In production, ensure production origins are included
if os.getenv("VERCEL_ENV") == "production" or os.getenv("ENVIRONMENT") == "production":
    for origin in production_origins:
        if origin not in allowed_origins:
            allowed_origins.append(origin)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Log the allowed origins and environment variables for debugging
print(f"VERCEL_ENV: {os.getenv('VERCEL_ENV')}")
print(f"ENVIRONMENT: {os.getenv('ENVIRONMENT')}")
print(f"OPENAI_API_KEY configured: {'Yes' if os.getenv('OPENAI_API_KEY') else 'No'}")
print(f"CORS allowed origins: {allowed_origins}")
print(f"Current directory: {os.getcwd()}")
print(f"Directory contents: {os.listdir('.')}")
print(f"Data directory exists: {os.path.exists('data')}")
if os.path.exists('data'):
    print(f"Data directory contents: {os.listdir('data')}")
    print(f"MenuImages exists: {os.path.exists('data/MenuImages')}")
    if os.path.exists('data/MenuImages'):
        print(f"MenuImages contents: {os.listdir('data/MenuImages')}")

app.include_router(chat.router)

app.mount("/images", StaticFiles(directory="data/MenuImages"), name="images")
