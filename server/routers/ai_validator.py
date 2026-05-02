import os
import json
import httpx
from fastapi import APIRouter, HTTPException
from server.models import StartupValidationRequest, StartupValidationResponse

router = APIRouter(prefix="/api/ai", tags=["ai"])


async def call_ai(prompt: str) -> str:
    api_key = os.getenv("REPLIT_AI_API_KEY", "").strip()
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="AI_KEY_MISSING: Please add REPLIT_AI_API_KEY to your Secrets (lock icon in sidebar)."
        )

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": "claude-3-5-haiku",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1500
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://replit.com/api/v1/ai/anthropic/messages",
                headers=headers,
                json=payload
            )
            if response.status_code == 200:
                data = response.json()
                return data["content"][0]["text"]
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"AI API error: {response.text}"
                )
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AI request timed out. Please try again.")


@router.post("/validate", response_model=StartupValidationResponse)
async def validate_startup(request: StartupValidationRequest):
    if not request.idea.strip() or len(request.idea.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please describe your idea in at least 10 characters.")

    prompt = f"""You are an expert startup analyst. Analyze this startup idea and return ONLY a valid JSON object with no markdown or code fences.

Startup Idea: {request.idea}

Return exactly this JSON structure:
{{
  "problem": "2-3 sentence description of the core problem being solved",
  "solution": "2-3 sentence description of how this startup solves it",
  "market_analysis": "3-4 sentences on market size, growth potential, and competitive landscape",
  "value_proposition": "2-3 sentences on unique value and competitive advantage",
  "feasibility_score": 72,
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2",
    "Actionable recommendation 3",
    "Actionable recommendation 4"
  ]
}}"""

    try:
        raw = await call_ai(prompt)
        cleaned = raw.strip()
        if "```" in cleaned:
            cleaned = cleaned.split("```")[1]
            if cleaned.startswith("json"):
                cleaned = cleaned[4:]
            cleaned = cleaned.strip()
        data = json.loads(cleaned)
        return StartupValidationResponse(**data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
