from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter(prefix="/api/courses", tags=["courses"])

COURSES = [
    {
        "id": 1,
        "icon": "🚀",
        "title": "Entrepreneurship 101",
        "category": "Foundation",
        "level": "Beginner",
        "duration": "6 weeks",
        "lessons": 18,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.8,
        "students": 1240,
        "desc": "Learn the core principles of building a startup — from idea generation to business model design and early customer discovery.",
        "topics": ["Opportunity Recognition", "Business Model Canvas", "Customer Discovery", "Lean Startup"],
        "link": "https://www.coursera.org/learn/wharton-entrepreneurship"
    },
    {
        "id": 2,
        "icon": "💡",
        "title": "Design Thinking for Innovation",
        "category": "Strategy",
        "level": "Beginner",
        "duration": "5 weeks",
        "lessons": 15,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.7,
        "students": 980,
        "desc": "Apply design thinking to solve real-world problems. Learn empathy mapping, prototyping, and iterative solution design.",
        "topics": ["Empathy Mapping", "Problem Framing", "Rapid Prototyping", "User Testing"],
        "link": "https://www.coursera.org/learn/design-thinking-innovation"
    },
    {
        "id": 3,
        "icon": "📊",
        "title": "Business Model Innovation",
        "category": "Strategy",
        "level": "Intermediate",
        "duration": "4 weeks",
        "lessons": 12,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.6,
        "students": 760,
        "desc": "Understand how to design, test and iterate business models. Study real-world cases from Airbnb, Uber and other disruptive companies.",
        "topics": ["Value Proposition Design", "Revenue Streams", "Cost Structure", "Pivoting"],
        "link": "https://www.edx.org/learn/business"
    },
    {
        "id": 4,
        "icon": "💰",
        "title": "Startup Fundraising Essentials",
        "category": "Finance",
        "level": "Intermediate",
        "duration": "4 weeks",
        "lessons": 14,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.9,
        "students": 1560,
        "desc": "Understand investor psychology, pitch deck structure, term sheets, and how to approach angels, VCs, and government grant programs in India.",
        "topics": ["Pitch Deck Design", "Valuation Basics", "Term Sheets", "Angel vs VC"],
        "link": "https://www.coursera.org/learn/startup-funding"
    },
    {
        "id": 5,
        "icon": "🎯",
        "title": "Finding Product-Market Fit",
        "category": "Strategy",
        "level": "Intermediate",
        "duration": "5 weeks",
        "lessons": 16,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.8,
        "students": 890,
        "desc": "Proven frameworks to validate your idea, find early adopters, and systematically work towards product-market fit.",
        "topics": ["Validation Frameworks", "MVP Definition", "User Interviews", "Metrics & KPIs"],
        "link": "https://www.ycombinator.com/library"
    },
    {
        "id": 6,
        "icon": "🌿",
        "title": "Sustainable & Impact Business",
        "category": "Sustainability",
        "level": "Beginner",
        "duration": "4 weeks",
        "lessons": 12,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.5,
        "students": 640,
        "desc": "Build businesses that create positive environmental and social impact. Learn ESG principles, circular economy design, and impact measurement.",
        "topics": ["ESG Framework", "Circular Economy", "Impact Measurement", "B-Corp Standards"],
        "link": "https://www.edx.org/learn/sustainability"
    },
    {
        "id": 7,
        "icon": "📱",
        "title": "No-Code Product Development",
        "category": "Technology",
        "level": "Beginner",
        "duration": "6 weeks",
        "lessons": 20,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.7,
        "students": 2100,
        "desc": "Build your MVP without writing code. Master tools like Bubble, Webflow, Glide, and Zapier to go from idea to working product in weeks.",
        "topics": ["Bubble.io", "Webflow", "Zapier Automation", "Database Design"],
        "link": "https://bubble.io/academy"
    },
    {
        "id": 8,
        "icon": "🤝",
        "title": "Growth Marketing for Startups",
        "category": "Marketing",
        "level": "Beginner",
        "duration": "5 weeks",
        "lessons": 16,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.6,
        "students": 1380,
        "desc": "Growth hacking, content marketing, SEO basics, and community-led growth strategies for early-stage startups on a zero budget.",
        "topics": ["Growth Loops", "Content Strategy", "SEO Basics", "Community Building"],
        "link": "https://www.hubspot.com/resources/courses"
    },
    {
        "id": 9,
        "icon": "🧠",
        "title": "Founder Mindset & Leadership",
        "category": "Foundation",
        "level": "Beginner",
        "duration": "3 weeks",
        "lessons": 10,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.9,
        "students": 2400,
        "desc": "Develop the resilience, focus, and leadership mindset that separates successful founders from the rest. Includes real founder stories.",
        "topics": ["Resilience Building", "Decision Making", "Team Leadership", "Avoiding Burnout"],
        "link": "https://www.ycombinator.com/library"
    },
    {
        "id": 10,
        "icon": "⚖️",
        "title": "Legal Basics for Indian Startups",
        "category": "Foundation",
        "level": "Beginner",
        "duration": "3 weeks",
        "lessons": 9,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.4,
        "students": 530,
        "desc": "Understand company incorporation, IP protection, co-founder agreements, and compliance requirements specific to Indian startups.",
        "topics": ["Company Registration", "IP & Trademarks", "Co-founder Agreements", "Startup India"],
        "link": "https://www.startupindia.gov.in/content/sih/en/learning_platform.html"
    },
    {
        "id": 11,
        "icon": "📈",
        "title": "Financial Modelling for Founders",
        "category": "Finance",
        "level": "Intermediate",
        "duration": "4 weeks",
        "lessons": 13,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.7,
        "students": 710,
        "desc": "Build investor-ready financial models from scratch. Learn unit economics, runway calculation, P&L projections, and how to present numbers to investors.",
        "topics": ["Unit Economics", "Runway Planning", "P&L Projections", "Investor Metrics"],
        "link": "https://www.coursera.org/learn/financial-planning"
    },
    {
        "id": 12,
        "icon": "🌐",
        "title": "Pitching & Public Speaking",
        "category": "Foundation",
        "level": "Beginner",
        "duration": "3 weeks",
        "lessons": 10,
        "certified": True,
        "free": True,
        "provider": "IgnitegenZ",
        "rating": 4.8,
        "students": 1900,
        "desc": "Craft compelling startup pitches and build your public speaking confidence. Learn the 3-minute elevator pitch, demo day format, and storytelling.",
        "topics": ["Pitch Structure", "Storytelling", "Handling Q&A", "Demo Day Format"],
        "link": "https://www.coursera.org/learn/public-speaking"
    }
]

CATEGORIES = ["All", "Foundation", "Strategy", "Finance", "Technology", "Marketing", "Sustainability"]


@router.get("/")
async def get_courses(
    category: Optional[str] = Query(None),
    level: Optional[str] = Query(None)
):
    courses = COURSES
    if category and category != "All":
        courses = [c for c in courses if c["category"] == category]
    if level and level != "All":
        courses = [c for c in courses if c["level"] == level]
    return courses


@router.get("/categories")
async def get_categories():
    return CATEGORIES


@router.get("/{course_id}")
async def get_course(course_id: int):
    for c in COURSES:
        if c["id"] == course_id:
            return c
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Course not found")
