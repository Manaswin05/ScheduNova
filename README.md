<div align="center">

# 🚀 ScheduNova

**AI-Powered Study Scheduler — Plan smarter. Study harder. Recover faster.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Node.js](https://img.shields.io/badge/Express-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)

[Live Demo](#) · [Report Bug](https://github.com/Manaswin05/ScheduNova/issues) · [Request Feature](https://github.com/Manaswin05/ScheduNova/issues)

</div>

---

## ✨ What is ScheduNova?

ScheduNova is a full-stack, AI-assisted productivity platform built for students and self-learners. It combines a sleek dark-mode React dashboard with a dual backend — a **Node.js/Express** API for task persistence and a **Python/FastAPI** microservice for real-time AI health recommendations.

> **Demo Mode** — When the backends are offline, the app automatically falls back to rich mock data. No configuration required to explore the UI.

---

## 🗺️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ScheduNova                               │
│                                                                 │
│  ┌──────────────────┐    REST    ┌─────────────────────────┐   │
│  │   React + Vite   │◄──────────►│  Node.js / Express API  │   │
│  │  (TypeScript 6)  │            │  Tasks CRUD · MongoDB   │   │
│  │  TailwindCSS 4   │            └─────────────────────────┘   │
│  │  Recharts        │                                           │
│  │  Mermaid.js      │    REST    ┌─────────────────────────┐   │
│  │  Lucide Icons    │◄──────────►│  Python / FastAPI       │   │
│  └──────────────────┘            │  AI Recommendations     │   │
│                                  └─────────────────────────┘   │
│                                                                 │
│                       ┌───────────┐                            │
│                       │  MongoDB  │                            │
│                       └───────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Features

### 📅 Dashboard — Today's Command Centre
- Live task list with status pipeline: `todo` → `in_progress` → `completed` → `skipped`
- Task difficulty badges: `low` · `medium` · `high` · `intense`
- Duration tracking: estimated vs. actual, with performance multiplier
- Mood & energy logging with timestamped entries

### 🤖 AI Health Insights _(Python / FastAPI)_
- Submits your **sleep hours**, **stress score**, and **burnout risk** to the AI service
- Returns contextual recommendations: reschedule heavy tasks, take a power nap, or encouragement when metrics are healthy
- Each recommendation is actionable and dismissible

### 📋 Routine Manager
- Build and manage recurring study blocks and weekly routines
- Visual schedule planner

### 📊 Performance Analytics _(Recharts)_
- Historical performance graphs with trend lines
- Burnout risk timeline — visualise your week at a glance
- Focus quality and energy level charts

### 🏗️ Infrastructure
- **Offline-first** — rich mock data fallback when backends are unreachable
- **Lazy-loaded tabs** for minimal initial bundle size
- **Docker Compose** for one-command local full-stack dev
- **render.yaml** blueprint for zero-config cloud deployment

---

## 📁 Project Structure

```
schedunova/
├── src/                          # React frontend (Vite + TypeScript)
│   ├── components/
│   │   └── schedunova/
│   │       ├── dashboard/        # TodayView — daily task & mood panel
│   │       ├── ai/               # AiHealthInsights — AI recommendation UI
│   │       ├── schedule/         # RoutineManager — weekly planner
│   │       ├── analytics/        # PerformanceTracker — Recharts dashboards
│   │       └── layout/           # AppLayout, GlassNav
│   ├── services/
│   │   └── api.ts                # Axios clients for Node & Python backends
│   ├── types/
│   │   └── schedunova.ts         # Shared TypeScript interfaces
│   ├── mock/
│   │   └── schedunovaData.ts     # Rich mock data for offline / demo mode
│   └── App.tsx                   # Root — tab router + backend health check
│
├── backend-node/                 # Express + Mongoose (Tasks CRUD)
│   └── src/index.ts
│
├── backend-python/               # FastAPI (AI recommendations)
│   └── main.py
│
├── docker-compose.yml            # Full local stack (Mongo + Node + Python + React)
├── render.yaml                   # Render.com deployment blueprint
├── Dockerfile                    # Frontend production image (Nginx)
├── nginx.conf                    # Nginx SPA routing config
└── .env.example                  # Environment variable template
```

---

## ⚡ Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Python | ≥ 3.11 |
| Docker & Docker Compose | any recent |

---

### Option A — Frontend Only (Demo Mode)

The fastest way to explore the UI. The app automatically uses mock data when the backends are offline.

```bash
# 1. Clone the repo
git clone https://github.com/Manaswin05/ScheduNova.git
cd ScheduNova

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** — you're in Demo Mode. 🎉

---

### Option B — Full Stack (Manual)

Run all three services concurrently with a single command:

```bash
# 1. Copy and configure environment variables
cp .env.example .env

# 2. Install frontend deps
npm install

# 3. Install Node backend deps
npm install --prefix backend-node

# 4. Install Python deps
cd backend-python && pip install -r requirements.txt && cd ..

# 5. Run everything at once (colour-coded console output)
npm run dev:all
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Node.js API | http://localhost:5000 |
| Python AI API | http://localhost:8000 |

---

### Option C — Docker Compose _(Recommended)_

```bash
docker compose up --build
```

All four services — Frontend, Node API, Python AI, and MongoDB — spin up automatically with health checks. The frontend is served at **http://localhost:5173**.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```env
# ─── Frontend (Vite) ──────────────────────────────────────
# Leave blank to auto-use localhost defaults
VITE_NODE_API_URL=
VITE_PYTHON_API_URL=

# ─── Node.js Backend ──────────────────────────────────────
PORT=5000
MONGODB_URI=mongodb://localhost:27017/schedunova
FRONTEND_URL=http://localhost:5173

# ─── Python Backend ───────────────────────────────────────
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env` to git.** It is already listed in `.gitignore`.

---

## 🚢 Deployment

### Deploy to Render _(Full Stack)_

ScheduNova ships with a `render.yaml` blueprint for zero-config deployment on [Render](https://render.com).

1. Push your repo to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint**
3. Connect your repository — Render auto-detects `render.yaml`
4. Set `MONGODB_URI` manually in the Render dashboard (use MongoDB Atlas)
5. Click **Deploy** 🚀

| Service | URL Pattern |
|---------|-------------|
| Frontend (Nginx) | `https://schedunova-frontend.onrender.com` |
| Node.js API | `https://schedunova-node-api.onrender.com` |
| Python AI API | `https://schedunova-python-api.onrender.com` |

### Deploy to Netlify _(Frontend Only)_

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

The `netlify.toml` is included for SPA routing support.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework with concurrent features |
| **TypeScript 6** | End-to-end type safety |
| **Vite 8** | Lightning-fast HMR dev server & bundler |
| **TailwindCSS 4** | Utility-first styling with custom design tokens |
| **Recharts** | Performance analytics charts |
| **Mermaid.js** | Diagram rendering for schedule visualisation |
| **Lucide React** | Premium icon library |
| **date-fns** | Date manipulation utilities |
| **canvas-confetti** | Celebratory micro-animations on task completion |
| **Axios** | HTTP client with timeout & error handling |

### Backend — Node.js
| Technology | Purpose |
|---|---|
| **Express 5** | REST API framework |
| **Mongoose** | MongoDB ODM with schema validation |
| **TypeScript** | Typed Node.js development |
| **ts-node-dev** | Fast dev server with hot reload |

### Backend — Python
| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance async API framework |
| **Pydantic** | Request/response data validation |
| **Uvicorn** | ASGI server |

### Infrastructure
| Technology | Purpose |
|---|---|
| **MongoDB 7** | Primary database for task persistence |
| **Docker Compose** | Local full-stack orchestration |
| **Nginx** | Production frontend server & SPA routing |
| **Render.com** | Cloud deployment platform |
| **Oxlint** | Blazing-fast JavaScript/TypeScript linter |

---

## 📡 API Reference

### Node.js API — `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tasks` | Fetch all study tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Python AI API — `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/ai/recommendations` | Get AI health recommendations |

**Example — AI Recommendations:**

```bash
curl -X POST http://localhost:8000/api/ai/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "sleepHoursLastNight": 5.5,
    "averageStressThisWeek": 8.2,
    "burnoutRisk": "high"
  }'
```

```json
{
  "recommendations": [
    {
      "id": "4821",
      "type": "warning",
      "title": "Low Sleep Detected",
      "description": "You had less than 6 hours of sleep. Consider taking a 20-minute power nap.",
      "isApplied": false
    },
    {
      "id": "7634",
      "type": "reschedule",
      "title": "High Stress Levels",
      "description": "Your stress levels have been high. I recommend rescheduling intense tasks to next week.",
      "isApplied": false
    }
  ]
}
```

---

## 🔬 Data Model

```typescript
interface StudyTask {
  id: string
  title: string
  subject: string
  durationMinutes: number
  difficulty: 'low' | 'medium' | 'high' | 'intense'
  status: 'todo' | 'in_progress' | 'completed' | 'skipped'
  startTime?: string   // ISO 8601
  endTime?: string     // ISO 8601
  notes?: string
}

interface HealthMetrics {
  sleepHoursLastNight: number
  averageStressThisWeek: number   // 1–10
  burnoutRisk: 'low' | 'moderate' | 'high' | 'critical'
  procrastinationIndex?: number   // 1–10
}

interface DailyProfile {
  date: string              // YYYY-MM-DD
  tasks: StudyTask[]
  moods: MoodLog[]
  health: HealthMetrics
  recommendations: AiRecommendation[]
  performanceSpeed?: number // e.g. 1.2 = 20% faster than estimated
}
```

---

## 🧹 npm Scripts

```bash
# Development
npm run dev          # Start frontend dev server (Vite)
npm run dev:node     # Start Node.js API only
npm run dev:python   # Start Python AI API only
npm run dev:all      # Start all three concurrently (colour-coded output)

# Production
npm run build        # TypeScript compile + Vite production bundle
npm run preview      # Preview the production build locally

# Quality
npm run lint         # Run Oxlint static analysis
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feat/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feat/amazing-feature`
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📜 License

Distributed under the **ISC License**.

---

## 👨‍💻 Author

**Manaswin** — [@Manaswin05](https://github.com/Manaswin05)

---

<div align="center">

Made with ❤️ and too much caffeine · Give it a ⭐ if ScheduNova helped you study smarter!

</div>
