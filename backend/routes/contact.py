from fastapi import APIRouter, HTTPException
from typing import List
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

from models.blog import ContactSubmission, ContactSubmissionCreate

# Get database connection
from server import db

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/submit", response_model=ContactSubmission)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Submit a contact form and optionally send email"""
    try:
        # Create contact submission record
        contact = ContactSubmission(**contact_data.dict())
        
        # Save to database
        contact_dict = contact.dict()
        result = await db.contact_submissions.insert_one(contact_dict)
        
        # Send email notification (in real implementation, you'd use proper email service)
        try:
            await send_contact_email(contact)
        except Exception as email_error:
            print(f"Email sending failed: {email_error}")
            # Continue execution even if email fails
        
        if result.inserted_id:
            return contact
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")

async def send_contact_email(contact: ContactSubmission):
    """Send email notification for contact form submission"""
    try:
        # Email configuration (in production, use proper email service like SendGrid)
        smtp_server = os.getenv("SMTP_SERVER", "localhost")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_username = os.getenv("SMTP_USERNAME", "")
        smtp_password = os.getenv("SMTP_PASSWORD", "")
        from_email = os.getenv("FROM_EMAIL", "noreply@aagamshah.com")
        to_email = "snaagam@gmail.com"
        
        # Create email content
        subject = f"New Contact Form Submission: {contact.subject}"
        
        html_body = f"""
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Company:</strong> {contact.company or 'Not provided'}</p>
            <p><strong>Phone:</strong> {contact.phone or 'Not provided'}</p>
            <p><strong>Subject:</strong> {contact.subject}</p>
            <p><strong>Message:</strong></p>
            <p>{contact.message}</p>
            <hr>
            <p><small>Submitted at: {contact.submitted_at}</small></p>
        </body>
        </html>
        """
        
        text_body = f"""
        New Contact Form Submission
        
        Name: {contact.name}
        Email: {contact.email}
        Company: {contact.company or 'Not provided'}
        Phone: {contact.phone or 'Not provided'}
        Subject: {contact.subject}
        
        Message:
        {contact.message}
        
        Submitted at: {contact.submitted_at}
        """
        
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = from_email
        msg["To"] = to_email
        
        # Add text and HTML parts
        text_part = MIMEText(text_body, "plain")
        html_part = MIMEText(html_body, "html")
        
        msg.attach(text_part)
        msg.attach(html_part)
        
        # Send email (only if SMTP is configured)
        if smtp_username and smtp_password:
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        else:
            print(f"Email not sent - SMTP not configured. Would send: {subject}")
            
    except Exception as e:
        print(f"Error sending email: {e}")
        # Don't raise exception - we don't want email failures to break contact form

@router.get("/submissions", response_model=List[ContactSubmission])
async def get_contact_submissions(limit: int = 50, skip: int = 0):
    """Get contact form submissions (admin only in production)"""
    try:
        cursor = db.contact_submissions.find().sort("submitted_at", -1).skip(skip).limit(limit)
        submissions = await cursor.to_list(length=limit)
        
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact submissions: {str(e)}")

@router.get("/submissions/{submission_id}", response_model=ContactSubmission)
async def get_contact_submission(submission_id: str):
    """Get a specific contact submission"""
    try:
        submission = await db.contact_submissions.find_one({"id": submission_id})
        if not submission:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        
        return ContactSubmission(**submission)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact submission: {str(e)}")

@router.put("/submissions/{submission_id}/status")
async def update_submission_status(submission_id: str, status: str):
    """Update the status of a contact submission"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count:
            return {"message": "Status updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Contact submission not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating submission status: {str(e)}")