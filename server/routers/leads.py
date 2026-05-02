from fastapi import APIRouter, HTTPException
from server.models import LeadSubmission
from server.database import get_db

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("/")
async def submit_lead(lead: LeadSubmission):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO leads (name, email, problem_statement, solution) VALUES (?, ?, ?, ?)",
            (lead.name, lead.email, lead.problem_statement, lead.solution)
        )
        conn.commit()
        conn.close()
        return {"success": True, "message": "Your idea has been submitted! We'll be in touch soon."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
