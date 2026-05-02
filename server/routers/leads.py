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
        return {"success": True, "message": "Your idea has been submitted! Our team will reach out within 48 hours."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def get_leads():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM leads ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


@router.delete("/{lead_id}")
async def delete_lead(lead_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    conn.commit()
    conn.close()
    return {"success": True}
