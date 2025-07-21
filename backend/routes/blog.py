from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from datetime import datetime

from models.blog import BlogPost, BlogPostCreate, BlogPostUpdate

# Get database connection
from server import db

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("/posts", response_model=List[BlogPost])
async def get_blog_posts(
    published_only: bool = True,
    limit: int = 20,
    skip: int = 0
):
    """Get all blog posts with optional filtering"""
    try:
        query = {}
        if published_only:
            query["is_published"] = True
            
        cursor = db.blog_posts.find(query).sort("publish_date", -1).skip(skip).limit(limit)
        posts = await cursor.to_list(length=limit)
        
        return [BlogPost(**post) for post in posts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blog posts: {str(e)}")

@router.get("/posts/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a specific blog post by ID"""
    try:
        post = await db.blog_posts.find_one({"id": post_id})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return BlogPost(**post)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blog post: {str(e)}")

@router.post("/posts", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate):
    """Create a new blog post"""
    try:
        blog_post = BlogPost(**post_data.dict())
        
        post_dict = blog_post.dict()
        result = await db.blog_posts.insert_one(post_dict)
        
        if result.inserted_id:
            return blog_post
        else:
            raise HTTPException(status_code=500, detail="Failed to create blog post")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating blog post: {str(e)}")

@router.put("/posts/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post_data: BlogPostUpdate):
    """Update an existing blog post"""
    try:
        # Check if post exists
        existing_post = await db.blog_posts.find_one({"id": post_id})
        if not existing_post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Update only provided fields
        update_data = {k: v for k, v in post_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.blog_posts.update_one(
            {"id": post_id},
            {"$set": update_data}
        )
        
        if result.modified_count:
            updated_post = await db.blog_posts.find_one({"id": post_id})
            return BlogPost(**updated_post)
        else:
            raise HTTPException(status_code=500, detail="Failed to update blog post")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating blog post: {str(e)}")

@router.delete("/posts/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    try:
        result = await db.blog_posts.delete_one({"id": post_id})
        
        if result.deleted_count:
            return {"message": "Blog post deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Blog post not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting blog post: {str(e)}")

@router.get("/posts/tag/{tag}")
async def get_posts_by_tag(tag: str, limit: int = 10):
    """Get blog posts filtered by tag"""
    try:
        cursor = db.blog_posts.find(
            {"tags": {"$in": [tag]}, "is_published": True}
        ).sort("publish_date", -1).limit(limit)
        
        posts = await cursor.to_list(length=limit)
        return [BlogPost(**post) for post in posts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts by tag: {str(e)}")

@router.get("/tags")
async def get_all_tags():
    """Get all unique tags from published blog posts"""
    try:
        pipeline = [
            {"$match": {"is_published": True}},
            {"$unwind": "$tags"},
            {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        
        result = await db.blog_posts.aggregate(pipeline).to_list(length=None)
        tags = [{"tag": item["_id"], "count": item["count"]} for item in result]
        
        return tags
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tags: {str(e)}")

@router.post("/seed")
async def seed_blog_posts():
    """Seed the database with initial blog posts"""
    try:
        # Check if posts already exist
        existing_count = await db.blog_posts.count_documents({})
        if existing_count > 0:
            return {"message": f"Database already has {existing_count} blog posts"}
        
        seed_posts = [
            {
                "title": "The Future of Data Analytics: Trends to Watch in 2025",
                "excerpt": "Exploring the latest trends in data analytics, from AI-powered insights to real-time processing and predictive modeling that will shape the industry.",
                "content": """
                <p>The data analytics landscape is evolving rapidly, with several key trends emerging that will define how we handle and interpret data in 2025 and beyond.</p>
                
                <h3>AI-Powered Analytics</h3>
                <p>Artificial intelligence is revolutionizing how we approach data analysis. Machine learning algorithms can now identify patterns and insights that would take human analysts weeks to discover. The integration of AI into analytics platforms is making complex analysis more accessible to non-technical users.</p>
                
                <h3>Real-Time Processing</h3>
                <p>The demand for real-time insights is growing exponentially. Organizations need to make decisions based on current data, not historical reports. Technologies like Apache Kafka and real-time data warehouses are enabling instant analytics across industries.</p>
                
                <h3>Predictive Modeling</h3>
                <p>Advanced predictive models are becoming more accessible, allowing businesses to forecast trends and make proactive decisions rather than reactive ones. From supply chain optimization to customer behavior prediction, these models are driving competitive advantages.</p>
                
                <h3>Data Democratization</h3>
                <p>Self-service analytics tools are empowering business users to explore data independently. This trend is reducing the bottleneck on data teams while increasing organization-wide data literacy.</p>
                """,
                "tags": ["Data Analytics", "AI", "Machine Learning", "Trends"],
                "read_time": "5 min read",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                "is_published": True
            },
            {
                "title": "Building Effective BI Dashboards: A Practitioner's Guide",
                "excerpt": "Learn how to create compelling business intelligence dashboards that drive decision-making and deliver measurable business value.",
                "content": """
                <p>Creating effective BI dashboards is both an art and a science. Here's what I've learned from building dozens of dashboards across various industries.</p>
                
                <h3>Know Your Audience</h3>
                <p>The most important step is understanding who will use your dashboard and what decisions they need to make. Different stakeholders require different levels of detail and different types of visualizations.</p>
                
                <h3>Keep It Simple</h3>
                <p>Resist the urge to include every metric. Focus on the key performance indicators that truly matter. A cluttered dashboard is worse than no dashboard at all.</p>
                
                <h3>Design for Action</h3>
                <p>Every visualization should lead to a potential action. If it doesn't, consider removing it. The best dashboards tell a story that guides users toward specific decisions.</p>
                
                <h3>Performance Matters</h3>
                <p>A slow dashboard is a unused dashboard. Optimize your queries, use appropriate aggregations, and consider data refresh schedules that balance freshness with performance.</p>
                
                <h3>Mobile Responsiveness</h3>
                <p>In today's mobile-first world, ensure your dashboards work well on tablets and phones. Many executives prefer to review metrics on their mobile devices.</p>
                """,
                "tags": ["BI", "Dashboards", "Data Visualization", "Best Practices"],
                "read_time": "7 min read",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                "is_published": True
            },
            {
                "title": "SQL Optimization Techniques That Saved Me Hours",
                "excerpt": "Discover practical SQL optimization strategies that can dramatically improve query performance and reduce processing time.",
                "content": """
                <p>After years of working with complex datasets, I've discovered several SQL optimization techniques that have saved countless hours of processing time.</p>
                
                <h3>Index Strategy</h3>
                <p>Proper indexing can make the difference between a query that runs in seconds versus hours. Create indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY statements.</p>
                
                <h3>Query Structure</h3>
                <p>The way you structure your queries can have a massive impact on performance. Use subqueries judiciously, avoid unnecessary DISTINCT clauses, and leverage window functions where appropriate.</p>
                
                <h3>Data Types Matter</h3>
                <p>Choosing the right data types isn't just about storage - it affects query performance significantly. Use appropriate numeric types and avoid varchar when fixed-length strings suffice.</p>
                
                <h3>Partitioning Large Tables</h3>
                <p>For very large datasets, table partitioning can dramatically improve query performance by allowing the database to skip irrelevant data partitions.</p>
                
                <h3>Query Execution Plans</h3>
                <p>Always analyze execution plans to understand how your queries are being processed. This insight is invaluable for identifying bottlenecks and optimization opportunities.</p>
                """,
                "tags": ["SQL", "Database", "Performance", "Optimization"],
                "read_time": "6 min read",
                "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
                "is_published": True
            }
        ]
        
        # Create BlogPost objects and insert them
        for post_data in seed_posts:
            blog_post = BlogPost(**post_data)
            post_dict = blog_post.dict()
            await db.blog_posts.insert_one(post_dict)
        
        return {"message": f"Successfully seeded {len(seed_posts)} blog posts"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error seeding blog posts: {str(e)}")