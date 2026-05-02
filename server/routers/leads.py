import sqlite3
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException
from server.models import LeadSubmission
from server.database import get_supabase

router = APIRouter(prefix="/api/leads", tags=["leads"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "ignite_zen.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            problem_statement TEXT NOT NULL,
            solution TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)
    conn.commit()
    return conn


@router.get("/")
async def get_leads():
    db = get_supabase()
    if db:
        try:
            result = db.table("leads").select("*").order("created_at", desc=True).execute()
            return result.data
        except Exception:
            pass

    conn = get_db()
    try:
        rows = conn.execute("SELECT * FROM leads ORDER BY created_at DESC").fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()


@router.post("/", status_code=201)
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
        except Exception:
            pass

    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO leads (name, email, problem_statement, solution) VALUES (?, ?, ?, ?)",
            (lead.name, lead.email, lead.problem_statement, lead.solution)
        )
        conn.commit()
        return {"success": True, "message": "Thank you for sharing your idea! Our team will reach out within 48 hours."}
    finally:
        conn.close()


@router.delete("/{lead_id}")
async def delete_lead(lead_id: int):
    db = get_supabase()
    if db:
        try:
            db.table("leads").delete().eq("id", lead_id).execute()
            return {"success": True}
        except Exception:
            pass

    conn = get_db()
    try:
        cur = conn.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
        conn.commit()
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        return {"success": True}
    finally:
        conn.close()
