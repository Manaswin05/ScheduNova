import { DailyProfile, StudyTask, MoodLog, AiRecommendation, HealthMetrics } from '../types/schedunova'

const getTodayIso = (hours: number, minutes = 0) => {
  const d = new Date()
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

export const MOCK_TASKS: StudyTask[] = [
  {
    id: 't-1',
    title: 'Physics Mock Test',
    subject: 'Physics',
    durationMinutes: 120,
    estimatedDurationMinutes: 120,
    actualDurationMinutes: 135, // took 15 mins longer
    difficulty: 'intense',
    status: 'in_progress',
    startTime: getTodayIso(9, 0),
    endTime: getTodayIso(11, 0)
  },
  {
    id: 't-2',
    title: 'Chemistry Revision',
    subject: 'Chemistry',
    durationMinutes: 60,
    estimatedDurationMinutes: 60,
    actualDurationMinutes: 50, // finished 10 mins early
    difficulty: 'medium',
    status: 'todo',
    startTime: getTodayIso(11, 30),
    endTime: getTodayIso(12, 30)
  },
  {
    id: 't-3',
    title: 'Lunch Break',
    subject: 'Health',
    durationMinutes: 60,
    estimatedDurationMinutes: 60,
    difficulty: 'low',
    status: 'todo',
    startTime: getTodayIso(12, 30),
    endTime: getTodayIso(13, 30)
  },
  {
    id: 't-4',
    title: 'Calculus Problem Set',
    subject: 'Mathematics',
    durationMinutes: 90,
    estimatedDurationMinutes: 90,
    difficulty: 'high',
    status: 'todo',
    startTime: getTodayIso(13, 30),
    endTime: getTodayIso(15, 0)
  }
]

export const MOCK_MOODS: MoodLog[] = [
  {
    id: 'm-1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    stressLevel: 8,
    energyLevel: 3,
    focusQuality: 4,
    notes: 'Felt extremely exhausted.'
  }
]

export const MOCK_HEALTH: HealthMetrics = {
  sleepHoursLastNight: 5.5,
  averageStressThisWeek: 7.5,
  burnoutRisk: 'high',
  procrastinationIndex: 8 // High procrastination due to burnout
}

export const MOCK_RECOMMENDATIONS: AiRecommendation[] = [
  {
    id: 'r-1',
    timestamp: new Date().toISOString(),
    type: 'reschedule',
    title: 'High Burnout & Procrastination Detected',
    description: 'Your procrastination index is 8/10 this morning, likely due to low sleep (5.5h). I recommend breaking your Calculus set into 20-minute micro-sprints.',
    suggestedAction: {
      taskId: 't-4',
      actionLabel: 'Apply Micro-sprints'
    },
    isApplied: false
  },
  {
    id: 'r-2',
    timestamp: new Date().toISOString(),
    type: 'break',
    title: 'Schedule a Wellness Break',
    description: 'Add a 30-minute outdoor walk or meditation session before starting Math. It will improve your focus quality.',
    suggestedAction: {
      actionLabel: 'Add Break at 1:00 PM'
    },
    isApplied: false
  }
]

export const MOCK_DAILY_PROFILE: DailyProfile = {
  date: new Date().toISOString().split('T')[0],
  tasks: MOCK_TASKS,
  moods: MOCK_MOODS,
  health: MOCK_HEALTH,
  recommendations: MOCK_RECOMMENDATIONS,
  performanceSpeed: 0.85 // 15% slower than estimated on average today
}

// Generate some historical data for Recharts
export const generateHistoricalPerformance = () => {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    data.push({
      date: d.toLocaleDateString('en-US', { weekday: 'short' }),
      procrastination: Math.floor(Math.random() * 4) + (i === 0 ? 5 : 2), // Spiking today
      speed: 0.8 + (Math.random() * 0.4),
      estimated: 4 + Math.random() * 2,
      actual: 4 + Math.random() * 3
    })
  }
  return data
}

export const HISTORICAL_PERFORMANCE = generateHistoricalPerformance()
