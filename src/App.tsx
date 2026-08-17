import React, { useState, useEffect, lazy, Suspense } from 'react'
import { AppLayout } from './components/schedunova/layout/AppLayout'
import { NavTab } from './components/schedunova/layout/GlassNav'
import { TodayView } from './components/schedunova/dashboard/TodayView'
import { MOCK_DAILY_PROFILE } from './mock/schedunovaData'
import { getTasks, getAiRecommendations } from './services/api'
import { DailyProfile } from './types/schedunova'

// Lazy-load heavy views to improve initial load time
const AiHealthInsights = lazy(() =>
  import('./components/schedunova/ai/AiHealthInsights').then(m => ({ default: m.AiHealthInsights }))
)
const RoutineManager = lazy(() =>
  import('./components/schedunova/schedule/RoutineManager').then(m => ({ default: m.RoutineManager }))
)
const PerformanceTracker = lazy(() =>
  import('./components/schedunova/analytics/PerformanceTracker').then(m => ({ default: m.PerformanceTracker }))
)

const TabFallback = () => (
  <div className="flex items-center justify-center h-64 text-[#fafafa]/40 font-mono text-xs uppercase tracking-widest animate-pulse">
    Loading module...
  </div>
)

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard')
  const [profile, setProfile] = useState<DailyProfile>(MOCK_DAILY_PROFILE)
  const [loading, setLoading] = useState(true)
  const [backendStatus, setBackendStatus] = useState<'connected' | 'offline' | 'checking'>('checking')

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Fetch tasks from Node backend
        const realTasks = await getTasks()
        if (realTasks && realTasks.length > 0) {
          setProfile(prev => ({ ...prev, tasks: realTasks }))
          setBackendStatus('connected')
        } else {
          setBackendStatus('offline')
        }

        // Fetch AI recommendations from Python backend
        const aiRecs = await getAiRecommendations({
          sleepHoursLastNight: MOCK_DAILY_PROFILE.health.sleepHoursLastNight,
          averageStressThisWeek: MOCK_DAILY_PROFILE.health.averageStressThisWeek,
          burnoutRisk: MOCK_DAILY_PROFILE.health.burnoutRisk,
        })
        if (aiRecs && aiRecs.length > 0) {
          setProfile(prev => ({ ...prev, recommendations: aiRecs }))
        }
      } catch {
        // Silent fallback — mock data is already set as default state
        setBackendStatus('offline')
      } finally {
        setLoading(false)
      }
    }

    fetchRealData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-[#fafafa]/20 border-t-[#fafafa] rounded-full animate-spin" />
        <p className="text-[#fafafa]/50 font-mono text-xs uppercase tracking-widest animate-pulse">
          Initializing Nova Systems...
        </p>
      </div>
    )
  }

  return (
    <AppLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {/* Backend status pill — only visible when offline */}
      {backendStatus === 'offline' && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#09090b] border border-[#fafafa]/20 px-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest text-[#fafafa]/50 rounded-none">
          ● Demo Mode — Connect backend for live data
        </div>
      )}

      {activeTab === 'dashboard' && <TodayView profile={profile} />}
      {activeTab === 'health-ai' && (
        <Suspense fallback={<TabFallback />}>
          <AiHealthInsights profile={profile} />
        </Suspense>
      )}
      {activeTab === 'schedule' && (
        <Suspense fallback={<TabFallback />}>
          <RoutineManager profile={profile} />
        </Suspense>
      )}
      {activeTab === 'analytics' && (
        <Suspense fallback={<TabFallback />}>
          <PerformanceTracker profile={profile} />
        </Suspense>
      )}
      {activeTab === 'settings' && (
        <div className="flex items-center justify-center h-64 text-[#fafafa]/30 font-mono text-xs uppercase tracking-widest">
          Settings module coming soon...
        </div>
      )}
    </AppLayout>
  )
}

export default App
