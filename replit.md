# Ignite Zen — Virtual Pre-Incubation Platform

## Overview
A full-stack website for Ignite Zen, a virtual pre-incubation platform for ambitious student entrepreneurs. Tagline: **"Together We Thrive"**.

## Architecture

### Frontend — React + Vite (port 5000)
- Location: `client/`
- React 18 with React Router DOM
- CSS Modules for scoped styles
- Purple/white professional theme with Google Fonts (Inter + Poppins)
- Axios for API calls, proxied to backend via Vite config

### Backend — FastAPI + Python (port 8000)
- Location: `server/`
- SQLite database (`server/ignite_zen.db`) — zero-cost, no credentials needed
- Auto-seeded with mentor and institute data on startup
- AI Startup Validator using Replit Model Farm API

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, Founders Foundry, Education Hub, AI Validator, CTA |
| `/learning` | Learning | Live lectures, certified courses, master classes |
| `/mentorship` | Mentorship | Searchable mentor directory (Technology, Sustainability, Education) |
| `/networking` | Networking | Partnered institute search by city/keyword |
| `/funding` | Funding | Funding types, roadmap, toolkit |
| `/contact` | Contact | Lead submission form (Share Your Idea) |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/leads/` | Submit startup idea (name, email, problem, solution) |
| GET | `/api/mentors/` | List mentors (optional `?category=` filter) |
| GET | `/api/mentors/categories` | Available mentor categories |
| GET | `/api/institutes/` | List institutes (optional `?city=` and `?search=` filters) |
| GET | `/api/institutes/cities` | Available cities |
| POST | `/api/ai/validate` | AI startup idea validator |

## Database (SQLite)
Three tables auto-created and seeded on first run:
- `leads` — form submissions from Contact page
- `mentors` — Vasudeva Vangara, Dr. Tinoo Ubale, Abhay Prajapati + extras
- `institutes` — partnered labs and co-working spaces by city

## Workflows
- **Backend API** — `python run_server.py` on port 8000 (console)
- **Start application** — `cd client && npm run dev` on port 5000 (webview)

## AI Feature
The AI Startup Validator calls the Replit Model Farm API (Claude claude-3-5-haiku) at `/api/ai/validate`. Requires `REPLIT_AI_API_KEY` environment variable. Returns structured JSON: Problem, Solution, Market Analysis, Value Proposition, Feasibility Score, and Recommendations.

## Key Files
- `server/main.py` — FastAPI app entry point
- `server/database.py` — SQLite setup and seed data
- `server/models.py` — Pydantic models
- `server/routers/` — Route handlers (leads, mentors, institutes, ai_validator)
- `client/src/App.jsx` — React router setup
- `client/src/pages/` — All page components
- `client/src/components/` — Navbar, Footer, AIValidator
- `client/vite.config.js` — Vite config with API proxy
- `run_server.py` — Uvicorn server entry point
