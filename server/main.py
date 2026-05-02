import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from server.database import init_db
from server.routers import leads, mentors, institutes, ai_validator

app = FastAPI(title="IgnitegenZ API", version="1.0.0")

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
    return {"status": "ok", "service": "IgnitegenZ API"}


DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "client", "dist")

if os.path.exists(DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        index = os.path.join(DIST_DIR, "index.html")
        return FileResponse(index)
