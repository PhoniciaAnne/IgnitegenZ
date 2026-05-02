import json
from fastapi import APIRouter, Query
from typing import Optional
from server.database import get_db

router = APIRouter(prefix="/api/mentors", tags=["mentors"])


@router.get("/")
async def get_mentors(category: Optional[str] = Query(None)):
    conn = get_db()
    cursor = conn.cursor()
    if category and category != "All":
        cursor.execute("SELECT * FROM mentors WHERE category = ?", (category,))
    else:
        cursor.execute("SELECT * FROM mentors")
    rows = cursor.fetchall()
    conn.close()
    result = []
    for row in rows:
        d = dict(row)
        d["expertise"] = json.loads(d["expertise"]) if d["expertise"] else []
        result.append(d)
    return result


@router.get("/categories")
async def get_categories():
    return ["All", "Technology", "Sustainability", "Education"]
