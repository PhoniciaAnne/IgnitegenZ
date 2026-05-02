from fastapi import APIRouter, Query
from typing import Optional
from server.database import get_supabase, SEED_INSTITUTES

router = APIRouter(prefix="/api/institutes", tags=["institutes"])


@router.get("/")
async def get_institutes(city: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    db = get_supabase()
    if db:
        try:
            query = db.table("institutes").select("*")
            if city and city != "All":
                query = query.eq("city", city)
            result = query.execute()
            institutes = result.data
            if search:
                search_lower = search.lower()
                institutes = [
                    i for i in institutes
                    if search_lower in i.get("name", "").lower()
                    or search_lower in i.get("area", "").lower()
                    or search_lower in i.get("description", "").lower()
                ]
            return institutes
        except Exception:
            pass

    institutes = SEED_INSTITUTES
    if city and city != "All":
        institutes = [i for i in institutes if i["city"] == city]
    if search:
        search_lower = search.lower()
        institutes = [
            i for i in institutes
            if search_lower in i["name"].lower()
            or search_lower in i["area"].lower()
            or search_lower in i["description"].lower()
        ]
    return institutes


@router.get("/cities")
async def get_cities():
    return ["All", "Mumbai", "Pune", "Nashik", "Hyderabad", "Bengaluru"]
