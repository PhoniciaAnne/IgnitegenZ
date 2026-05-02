import sqlite3
import os
import json

DB_PATH = os.path.join(os.path.dirname(__file__), "ignite_zen.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            problem_statement TEXT NOT NULL,
            solution TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS mentors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            bio TEXT,
            expertise TEXT,
            avatar_url TEXT,
            linkedin_url TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS institutes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            city TEXT NOT NULL,
            area TEXT NOT NULL,
            description TEXT,
            facilities TEXT,
            contact_email TEXT,
            website TEXT
        )
    """)

    cursor.execute("SELECT COUNT(*) FROM mentors")
    if cursor.fetchone()[0] == 0:
        mentors = [
            ("Vasudeva Vangara", "Startup Coach at VDC-GITAM", "Technology",
             "Seasoned startup coach and technology strategist with 20+ years of experience helping student entrepreneurs scale their ideas into real ventures.",
             json.dumps(["Cloud Architecture", "AI/ML Strategy", "Product Development", "Tech Scaling"]),
             None, "#"),
            ("Dr. Tinoo Ubale", "Entrepreneurship Program Manager", "Sustainability",
             "PhD holder and entrepreneurship program manager with deep expertise in sustainable business models and green innovation for student startups.",
             json.dumps(["Green Technology", "Impact Measurement", "Circular Economy", "ESG Strategy"]),
             None, "#"),
            ("Abhay Prajapati", "Startup Coach | AVC @ VDC, GITAM", "Education",
             "Pioneer in technology-enabled learning solutions and a startup coach mentoring student entrepreneurs across India.",
             json.dumps(["EdTech", "Curriculum Design", "Student Entrepreneurship", "Learning Analytics"]),
             None, "#"),
            ("Priya Sharma", "Full-Stack Developer & Startup CTO", "Technology",
             "Serial entrepreneur with expertise in building scalable web applications. Helped 50+ startups reach their first users.",
             json.dumps(["Web Development", "Mobile Apps", "System Design", "DevOps"]),
             None, "#"),
            ("Dr. Ananya Krishnan", "Clean Energy & Climate Tech Advisor", "Sustainability",
             "Leading expert in renewable energy startups and climate tech investment across South Asia.",
             json.dumps(["Renewable Energy", "Climate Finance", "Sustainable Policy", "Green Startups"]),
             None, "#"),
            ("Prof. Rajan Mehta", "Higher Education & Pedagogy Expert", "Education",
             "Professor with 25 years of experience redesigning curricula for the digital age and entrepreneurship ecosystem.",
             json.dumps(["Higher Education", "Pedagogy", "Research Commercialization", "STEM Education"]),
             None, "#"),
        ]
        cursor.executemany(
            "INSERT INTO mentors (name, title, category, bio, expertise, avatar_url, linkedin_url) VALUES (?,?,?,?,?,?,?)",
            mentors
        )

    cursor.execute("SELECT COUNT(*) FROM institutes")
    if cursor.fetchone()[0] == 0:
        institutes = [
            ("TechHub Mumbai", "Co-working Space", "Mumbai", "Bandra Kurla Complex",
             "Premium co-working space with state-of-the-art labs and mentorship programs for tech startups.",
             json.dumps(["High-Speed Internet", "3D Printing Lab", "Conference Rooms", "Startup Library"]),
             "hello@techhubmumbai.in", "https://techhubmumbai.in"),
            ("IIT Bombay Innovation Cell", "University Lab", "Mumbai", "Powai",
             "World-class innovation lab offering incubation and research facilities for student entrepreneurs.",
             json.dumps(["Biotech Lab", "Electronics Workshop", "Prototyping Studio", "Investor Network"]),
             "innovation@iitb.ac.in", "https://www.iitb.ac.in"),
            ("Pune Startup Garage", "Co-working Space", "Pune", "Koregaon Park",
             "A vibrant startup ecosystem hub connecting entrepreneurs with mentors, investors, and peers.",
             json.dumps(["Meeting Pods", "Event Space", "Hot Desks", "Virtual Office"]),
             "info@punegarage.co", "#"),
            ("Nashik AgriTech Lab", "Research Lab", "Nashik", "MIDC",
             "Specialized research facility for agri-tech and food innovation startups with field testing capabilities.",
             json.dumps(["Soil Testing Lab", "Cold Storage", "R&D Kitchen", "Field Plots"]),
             "contact@nashikagritech.in", "#"),
            ("Hyderabad Cyber Labs", "Co-working Space", "Hyderabad", "HITEC City",
             "Cybersecurity and AI-focused innovation lab with government-backed incubation support.",
             json.dumps(["Cyber Range", "AI GPU Cluster", "Legal Support", "Investor Days"]),
             "reach@hydcyberlabs.in", "#"),
            ("Bengaluru Design Studio", "Co-working Space", "Bengaluru", "Indiranagar",
             "Creative co-working space for product designers, UX researchers, and consumer-tech startups.",
             json.dumps(["Design Lab", "User Testing Room", "Photography Studio", "Coffee Bar"]),
             "studio@blrdesign.in", "#"),
            ("T-Hub Hyderabad", "University Lab", "Hyderabad", "Madhapur",
             "India's largest startup incubator providing pre-incubation, incubation, and acceleration programs.",
             json.dumps(["Mentorship Network", "Investor Connect", "Workshops", "Government Support"]),
             "info@t-hub.co", "https://t-hub.co"),
        ]
        cursor.executemany(
            "INSERT INTO institutes (name, type, city, area, description, facilities, contact_email, website) VALUES (?,?,?,?,?,?,?,?)",
            institutes
        )

    conn.commit()
    conn.close()
