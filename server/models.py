from pydantic import BaseModel, EmailStr
from typing import Optional


class LeadSubmission(BaseModel):
    name: str
    email: str
    problem_statement: str
    solution: str


class Mentor(BaseModel):
    id: Optional[int] = None
    name: str
    title: str
    category: str
    bio: str
    expertise: list[str]
    avatar_url: Optional[str] = None
    linkedin_url: Optional[str] = None


class Institute(BaseModel):
    id: Optional[int] = None
    name: str
    type: str
    city: str
    area: str
    description: str
    facilities: list[str]
    contact_email: Optional[str] = None
    website: Optional[str] = None


class StartupValidationRequest(BaseModel):
    idea: str


class StartupValidationResponse(BaseModel):
    problem: str
    solution: str
    market_analysis: str
    value_proposition: str
    feasibility_score: int
    recommendations: list[str]
