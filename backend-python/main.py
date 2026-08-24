from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import os

app = FastAPI(title="ScheduNova AI API", version="1.0.0")

# In production, restrict to the actual frontend domain
allowed_origins = os.getenv("FRONTEND_URL", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origins] if allowed_origins != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthMetrics(BaseModel):
    sleepHoursLastNight: float
    averageStressThisWeek: float
    burnoutRisk: str

@app.get("/")
def health_check():
    return {"status": "ok", "service": "schedunova-python-api"}

@app.post("/api/ai/recommendations")
def get_ai_recommendations(metrics: HealthMetrics):
    # Simulated AI logic
    recommendations = []
    
    if metrics.sleepHoursLastNight < 6:
        recommendations.append({
            "id": str(random.randint(1000, 9999)),
            "type": "warning",
            "title": "Low Sleep Detected",
            "description": "You had less than 6 hours of sleep. Consider taking a 20-minute power nap.",
            "isApplied": False
        })
        
    if metrics.averageStressThisWeek > 7:
        recommendations.append({
            "id": str(random.randint(1000, 9999)),
            "type": "reschedule",
            "title": "High Stress Levels",
            "description": "Your stress levels have been high. I recommend rescheduling intense tasks to next week.",
            "isApplied": False
        })

    if not recommendations:
        recommendations.append({
            "id": str(random.randint(1000, 9999)),
            "type": "encouragement",
            "title": "You're doing great!",
            "description": "Your metrics look healthy. Keep up the good work and stay focused.",
            "isApplied": False
        })

    return {"recommendations": recommendations}

# Run via: uvicorn main:app --reload --port 8000
