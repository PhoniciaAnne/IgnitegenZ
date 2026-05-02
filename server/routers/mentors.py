from fastapi import APIRouter, Query
from typing import Optional
from server.database import get_supabase, SEED_MENTORS

router = APIRouter(prefix="/api/mentors", tags=["mentors"])


@router.get("/")
async def get_mentors(category: Optional[str] = Query(None)):
    db = get_supabase()
    if db:
        try:
            query = db.table("mentors").select("*")
            if category and category != "All":
                query = query.eq("category", category)
            result = query.execute()
            return result.data
        except Exception:
            pass

    mentors = SEED_MENTORS
    if category and category != "All":
        mentors = [m for m in mentors if m["category"] == category]
    return mentors


@router.get("/categories")
async def get_categories():
    return ["All", "Technology", "Sustainability", "Education"]
