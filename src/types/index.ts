// CRM Types
export type DealStage = 'lead' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'

export interface Deal {
  id: string
  company: string
  contactName: string
  contactEmail: string
  contactAvatar?: string
  value: number
  stage: DealStage
  probability: number // 0 - 100
  assignedTo: string
  lastActivity: string
  source: 'Organic' | 'Inbound' | 'Referral' | 'Outreach' | 'Partner'
  tags: string[]
  notesCount: number
  expectedCloseDate: string
}

export interface ActivityLog {
  id: string
  type: 'call' | 'email' | 'meeting' | 'deal_moved' | 'note' | 'contract'
  title: string
  description: string
  timestamp: string
  user: string
  dealId?: string
}

// Gantt & Scheduling Types
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed'

export interface GanttTask {
  id: string
  title: string
  category: 'Engineering' | 'Product' | 'Marketing' | 'Sales' | 'Operations' | 'Design'
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
  progress: number  // 0 - 100
  status: TaskStatus
  priority: TaskPriority
  assignee: {
    name: string
    avatar: string
    role: string
  }
  dependencies?: string[]
  dealId?: string
  colorTheme?: 'monochrome-high' | 'monochrome-dim' | 'white-solid' | 'striped'
}

// Heatmap Types
export interface DayActivity {
  date: string // YYYY-MM-DD
  count: number // overall activity level (0 - 4 scale or raw number)
  dealsClosed: number
  tasksCompleted: number
  callsCount: number
  revenueEarned: number
  highlights: string[]
}

// Analytics Types
export interface RevenueMetricPoint {
  month: string
  mrr: number
  arr: number
  target: number
  netNewARR: number
}

export interface FunnelStage {
  stage: string
  count: number
  conversionRate: number
  dropoffRate: number
}

export interface ChannelPerformance {
  channel: string
  leads: number
  deals: number
  revenue: number
  cac: number
  roi: number
}

// GitHub Explorer Types
export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
  topics: string[]
  updated_at: string
  created_at: string
  pushed_at: string
  homepage: string | null
  archived: boolean
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
    url: string
  }
  payload: any
  created_at: string
}

export interface GitHubContributionDay {
  date: string // YYYY-MM-DD
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubContributionData {
  totalContributions: number
  days: GitHubContributionDay[]
  currentStreak: number
  longestStreak: number
  totalActiveDays: number
  averagePerDay: number
}

export type GitHubHeatmapTheme = 'shadcn-monochrome' | 'github-emerald' | 'cyberpunk-violet' | 'solar-amber' | 'electric-cyan'

