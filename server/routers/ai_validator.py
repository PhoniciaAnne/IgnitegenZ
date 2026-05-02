import os
import json
import httpx
from fastapi import APIRouter, HTTPException
from server.models import StartupValidationRequest, StartupValidationResponse

router = APIRouter(prefix="/api/ai", tags=["ai"])

REPLIT_AI_API_KEY = os.getenv("REPLIT_AI_API_KEY", "")


async def call_replit_model_farm(prompt: str) -> str:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {REPLIT_AI_API_KEY}"
    }
    payload = {
        "model": "claude-3-5-haiku",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
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
                raise HTTPException(status_code=response.status_code, detail=f"AI API error: {response.text}")
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AI request timed out. Please try again.")


@router.post("/validate", response_model=StartupValidationResponse)
async def validate_startup(request: StartupValidationRequest):
    if not request.idea.strip():
        raise HTTPException(status_code=400, detail="Please provide a startup idea to validate.")

    if len(request.idea) < 10:
        raise HTTPException(status_code=400, detail="Please describe your idea in more detail.")

    prompt = f"""You are an expert startup analyst and business strategist. Analyze the following startup idea and provide a structured validation report.

Startup Idea: {request.idea}

Respond ONLY with a valid JSON object (no markdown, no code blocks) in this exact format:
{{
  "problem": "Clear description of the problem this startup solves (2-3 sentences)",
  "solution": "How the startup addresses this problem with its product or service (2-3 sentences)",
  "market_analysis": "Target market size, growth potential, key segments, and competitive landscape (3-4 sentences)",
  "value_proposition": "The unique value and competitive advantage this startup offers to customers (2-3 sentences)",
  "feasibility_score": <integer between 1-100 representing overall feasibility>,
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3",
    "Specific actionable recommendation 4"
  ]
}}"""

    try:
        raw_response = await call_replit_model_farm(prompt)
        cleaned = raw_response.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("```")[1]
            if cleaned.startswith("json"):
                cleaned = cleaned[4:]
            cleaned = cleaned.strip()

        data = json.loads(cleaned)
        return StartupValidationResponse(**data)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response. Please try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
