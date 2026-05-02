import uvicorn
import os

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    is_prod = os.getenv("REPLIT_DEPLOYMENT", "") == "1"
    uvicorn.run(
        "server.main:app",
        host="0.0.0.0",
        port=port,
        reload=not is_prod,
        workers=1 if not is_prod else 2,
    )
