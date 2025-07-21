from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import route modules
from routes import blog, contact
from database import db, client

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Aagam Shah Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Basic health check route
@api_router.get("/")
async def root():
    return {"message": "Aagam Shah Portfolio API", "version": "1.0.0", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include route modules
app.include_router(blog.router)
app.include_router(contact.router)

# Include the basic API router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection and create indexes"""
    try:
        # Test database connection
        await db.command("ping")
        logger.info("Database connection established")
        
        # Create indexes for better performance
        await db.blog_posts.create_index([("id", 1)], unique=True)
        await db.blog_posts.create_index([("publish_date", -1)])
        await db.blog_posts.create_index([("tags", 1)])
        await db.blog_posts.create_index([("is_published", 1)])
        
        await db.contact_submissions.create_index([("id", 1)], unique=True)
        await db.contact_submissions.create_index([("submitted_at", -1)])
        
        logger.info("Database indexes created")
        
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()