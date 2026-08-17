export type TaskDifficulty = 'low' | 'medium' | 'high' | 'intense'
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'skipped'

export interface StudyTask {
  id: string
  title: string
  subject: string
  durationMinutes: number
  estimatedDurationMinutes?: number
  actualDurationMinutes?: number
  difficulty: TaskDifficulty
  status: TaskStatus
  startTime?: string // ISO string
  endTime?: string // ISO string
  notes?: string
}

export interface MoodLog {
  id: string
  timestamp: string // ISO string
  stressLevel: number // 1 to 10
  energyLevel: number // 1 to 10
  focusQuality: number // 1 to 10
  notes?: string
}

export interface HealthMetrics {
  sleepHoursLastNight: number
  averageStressThisWeek: number
  burnoutRisk: 'low' | 'moderate' | 'high' | 'critical'
  procrastinationIndex?: number // 1 to 10, how much they delayed starting tasks
}

export interface AiRecommendation {
  id: string
  timestamp: string // ISO string
  type: 'reschedule' | 'break' | 'encouragement' | 'warning'
  title: string
  description: string
  suggestedAction?: {
    taskId?: string
    newStartTime?: string
    newDuration?: number
    actionLabel: string
  }
  isApplied: boolean
}

export interface DailyProfile {
  date: string // YYYY-MM-DD
  tasks: StudyTask[]
  moods: MoodLog[]
  health: HealthMetrics
  recommendations: AiRecommendation[]
  performanceSpeed?: number // Multiplier, e.g., 1.2 means 20% faster than estimated
}
