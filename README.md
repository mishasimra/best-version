# Best Version

Best Version is a youth growth platform for learners, freelancers, early professionals, mentors, recruiters, and startup builders. It combines skill assessment, guided learning, projects, competitions, freelance opportunities, mentorship, portfolio growth, and career discovery in one full-stack product.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Auth: JWT email/password with Google-login and OTP-ready architecture
- Styling: custom scalable design system with responsive premium UI

## Project structure

- `frontend` — React app
- `backend` — Express API and Mongoose models

## Setup

1. Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

2. Copy env files:

```bash
copy backend\\.env.example backend\\.env
copy frontend\\.env.example frontend\\.env
```

3. Choose one backend mode:

- Real MongoDB:
  - Set `MONGO_URI` in `backend/.env`
  - Run `npm --prefix backend run seed`
  - Run `npm run dev`

- Zero-setup demo mode:
  - Run `npm run dev:demo`
  - This uses an in-memory MongoDB instance and auto-seeds demo data on boot
  - Frontend runs at `http://127.0.0.1:4173`

## Sample credentials

- Student: `aarav@student.best` / `Password123`
- Mentor: `neha@mentor.best` / `Password123`
- Admin: `admin@bestversion.com` / `Password123`

## Useful scripts

- `npm run dev` — frontend + backend with standard MongoDB config
- `npm run dev:demo` — frontend + backend with auto-seeded in-memory Mongo
- `npm run build` — build the frontend
- `npm run seed` — seed the backend against your configured MongoDB
- `npm run seed:demo` — seed an in-memory demo database

## Major features

- Landing page with premium brand presentation
- JWT auth with protected routes
- Personalized dashboard
- Skill assessment with saved results
- Course browsing, enrollment, and progress tracking
- Project builder with create/edit/submit flows
- Freelance, internship, and job opportunities
- Competitions and leaderboard
- Community feed and follow-style networking
- Mentorship discovery and request flow
- Profile and settings management
- Admin-ready overview for users, courses, competitions, and jobs

## Verified locally

- Frontend production build succeeds
- Backend imports cleanly
- In-memory Mongo demo seed succeeds
- Auth, dashboard, courses, community, and project creation APIs were smoke-tested against a live auto-seeded backend
