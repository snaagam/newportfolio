from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    author: str = "Aagam Shah"
    publish_date: datetime = Field(default_factory=datetime.utcnow)
    tags: List[str] = []
    read_time: str
    image: str
    is_published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    tags: List[str] = []
    read_time: str
    image: str
    is_published: bool = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time: Optional[str] = None
    image: Optional[str] = None
    is_published: Optional[bool] = None

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    company: Optional[str] = None
    phone: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "received"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    company: Optional[str] = None
    phone: Optional[str] = None