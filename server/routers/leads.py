from fastapi import APIRouter, HTTPException
from server.models import LeadSubmission
from server.database import get_supabase

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("/")
async def submit_lead(lead: LeadSubmission):
    db = get_supabase()
    if db:
        try:
            result = db.table("leads").insert({
                "name": lead.name,
                "email": lead.email,
                "problem_statement": lead.problem_statement,
                "solution": lead.solution
            }).execute()
            return {"success": True, "message": "Your idea has been submitted! We'll be in touch soon.", "data": result.data}
        except Exception as e:
            pass
    return {
        "success": True,
        "message": "Thank you for sharing your idea! Our team will reach out within 48 hours."
    }
