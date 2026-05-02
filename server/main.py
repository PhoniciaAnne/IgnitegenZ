from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.database import init_db
from server.routers import leads, mentors, institutes, ai_validator

app = FastAPI(title="Ignite Zen API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(leads.router)
app.include_router(mentors.router)
app.include_router(institutes.router)
app.include_router(ai_validator.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Ignite Zen API"}
