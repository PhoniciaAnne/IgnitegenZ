import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Client = None

def get_supabase() -> Client:
    global supabase
    if SUPABASE_URL and SUPABASE_KEY and not supabase:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase


SEED_MENTORS = [
    {
        "id": 1,
        "name": "Vasudeva Vangara",
        "title": "Technology Strategist & CTO Advisor",
        "category": "Technology",
        "bio": "Seasoned technology leader with 20+ years of experience helping startups scale their tech infrastructure. Former CTO at multiple successful ventures.",
        "expertise": ["Cloud Architecture", "AI/ML Strategy", "Product Development", "Tech Scaling"],
        "avatar_url": None,
        "linkedin_url": "#"
    },
    {
        "id": 2,
        "name": "Dr. Tinoo Ubale",
        "title": "Sustainability & Impact Expert",
        "category": "Sustainability",
        "bio": "PhD in Environmental Sciences with a focus on sustainable business models. Advisor to 30+ green startups and social enterprises across South Asia.",
        "expertise": ["Green Technology", "Impact Measurement", "Circular Economy", "ESG Strategy"],
        "avatar_url": None,
        "linkedin_url": "#"
    },
    {
        "id": 3,
        "name": "Abhay Prajapati",
        "title": "EdTech Founder & Education Innovation Lead",
        "category": "Education",
        "bio": "Pioneer in technology-enabled learning solutions. Founded three ed-tech companies and mentored over 200 student entrepreneurs across India.",
        "expertise": ["EdTech", "Curriculum Design", "Student Entrepreneurship", "Learning Analytics"],
        "avatar_url": None,
        "linkedin_url": "#"
    },
    {
        "id": 4,
        "name": "Priya Sharma",
        "title": "Full-Stack Developer & Startup CTO",
        "category": "Technology",
        "bio": "Serial entrepreneur with expertise in building scalable web applications. Helped 50+ startups go from zero to first million users.",
        "expertise": ["Web Development", "Mobile Apps", "System Design", "DevOps"],
        "avatar_url": None,
        "linkedin_url": "#"
    },
    {
        "id": 5,
        "name": "Dr. Ananya Krishnan",
        "title": "Clean Energy & Climate Tech Advisor",
        "category": "Sustainability",
        "bio": "Leading expert in renewable energy startups and climate tech investment. Advises governments and private sector on sustainable innovation.",
        "expertise": ["Renewable Energy", "Climate Finance", "Sustainable Policy", "Green Startups"],
        "avatar_url": None,
        "linkedin_url": "#"
    },
    {
        "id": 6,
        "name": "Prof. Rajan Mehta",
        "title": "Higher Education & Pedagogy Expert",
        "category": "Education",
        "bio": "Professor of Education at IIT Bombay with 25 years of experience redesigning curricula for the digital age and entrepreneurship ecosystem.",
        "expertise": ["Higher Education", "Pedagogy", "Research Commercialization", "STEM Education"],
        "avatar_url": None,
        "linkedin_url": "#"
    }
]

SEED_INSTITUTES = [
    {
        "id": 1,
        "name": "TechHub Mumbai",
        "type": "Co-working Space",
        "city": "Mumbai",
        "area": "Bandra Kurla Complex",
        "description": "Premium co-working space with state-of-the-art labs and mentorship programs for tech startups.",
        "facilities": ["High-Speed Internet", "3D Printing Lab", "Conference Rooms", "Startup Library"],
        "contact_email": "hello@techhubmumbai.in",
        "website": "https://techhubmumbai.in"
    },
    {
        "id": 2,
        "name": "IIT Bombay Innovation Cell",
        "type": "University Lab",
        "city": "Mumbai",
        "area": "Powai",
        "description": "World-class innovation lab affiliated with IIT Bombay offering incubation and research facilities.",
        "facilities": ["Biotech Lab", "Electronics Workshop", "Prototyping Studio", "Investor Network"],
        "contact_email": "innovation@iitb.ac.in",
        "website": "https://www.iitb.ac.in"
    },
    {
        "id": 3,
        "name": "Pune Startup Garage",
        "type": "Co-working Space",
        "city": "Pune",
        "area": "Koregaon Park",
        "description": "A vibrant startup ecosystem hub connecting entrepreneurs with mentors, investors, and peers.",
        "facilities": ["Meeting Pods", "Event Space", "Hot Desks", "Virtual Office"],
        "contact_email": "info@punegarage.co",
        "website": "#"
    },
    {
        "id": 4,
        "name": "Nashik AgriTech Lab",
        "type": "Research Lab",
        "city": "Nashik",
        "area": "MIDC",
        "description": "Specialized research facility for agri-tech and food innovation startups with field testing capabilities.",
        "facilities": ["Soil Testing Lab", "Cold Storage", "R&D Kitchen", "Field Plots"],
        "contact_email": "contact@nashikagritech.in",
        "website": "#"
    },
    {
        "id": 5,
        "name": "Hyderabad Cyber Labs",
        "type": "Co-working Space",
        "city": "Hyderabad",
        "area": "HITEC City",
        "description": "Cybersecurity and AI-focused innovation lab with government-backed incubation support.",
        "facilities": ["Cyber Range", "AI GPU Cluster", "Legal Support", "Investor Days"],
        "contact_email": "reach@hydcyberlabs.in",
        "website": "#"
    },
    {
        "id": 6,
        "name": "Bengaluru Design Studio",
        "type": "Co-working Space",
        "city": "Bengaluru",
        "area": "Indiranagar",
        "description": "Creative co-working space for product designers, UX researchers, and consumer-tech startups.",
        "facilities": ["Design Lab", "User Testing Room", "Photography Studio", "Coffee Bar"],
        "contact_email": "studio@blrdesign.in",
        "website": "#"
    }
]
