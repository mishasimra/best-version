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

## Google sign-in setup

1. Create a Google OAuth Web Application in Google Cloud Console.
2. Add these redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `http://127.0.0.1:5000/api/auth/google/callback`
   - `https://your-backend-domain/api/auth/google/callback`
3. Set these backend environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI`
4. Set `CLIENT_URL` to include every frontend origin that should be allowed by CORS, separated by commas.
5. Restart the backend.

The frontend reads Google availability from `/api/auth/options`, so the button will disable itself cleanly when Google OAuth is not configured yet.

## Deployment

Recommended production setup:

- Frontend on Vercel
- Backend on Render, Railway, or another Node host
- MongoDB on Atlas

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the project root directory to `frontend`.
3. Set the environment variable:
   - `VITE_API_URL=https://your-backend-domain/api`
4. Deploy.

`frontend/vercel.json` is included so client-side routes like `/login`, `/signup`, `/dashboard`, and `/auth/google/callback` rewrite to `index.html`.

### Backend deployment

Deploy the `backend` folder as a Node service with:

- Build command: `npm install`
- Start command: `npm start`

Set these backend environment variables:

- `NODE_ENV=production`
- `PORT=5000` or your host-provided port
- `CLIENT_URL=https://your-frontend-domain.vercel.app`
- `MONGO_URI=your-mongodb-atlas-uri`
- `JWT_SECRET=replace-with-a-secure-secret`
- `JWT_EXPIRES_IN=7d`
- `GOOGLE_CLIENT_ID=replace-with-your-google-web-client-id`
- `GOOGLE_CLIENT_SECRET=replace-with-your-google-web-client-secret`
- `GOOGLE_REDIRECT_URI=https://your-backend-domain/api/auth/google/callback`
- `USE_IN_MEMORY_DB=false`
- `AUTO_SEED_DEMO=false`

If you use multiple frontend origins, set `CLIENT_URL` as a comma-separated list.

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
