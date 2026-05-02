import json
from fastapi import APIRouter, Query
from typing import Optional
from server.database import get_db

router = APIRouter(prefix="/api/institutes", tags=["institutes"])


@router.get("/")
async def get_institutes(city: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    conn = get_db()
    cursor = conn.cursor()
    if city and city != "All":
        cursor.execute("SELECT * FROM institutes WHERE city = ?", (city,))
    else:
        cursor.execute("SELECT * FROM institutes")
    rows = cursor.fetchall()
    conn.close()
    result = []
    for row in rows:
        d = dict(row)
        d["facilities"] = json.loads(d["facilities"]) if d["facilities"] else []
        result.append(d)
    if search:
        s = search.lower()
        result = [
            i for i in result
            if s in i["name"].lower() or s in i["area"].lower() or s in i["description"].lower()
        ]
    return result


@router.get("/cities")
async def get_cities():
    return ["All", "Mumbai", "Pune", "Nashik", "Hyderabad", "Bengaluru"]
