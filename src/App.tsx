import React, { useState } from 'react'
import { AppLayout } from './components/schedunova/layout/AppLayout'
import { NavTab } from './components/schedunova/layout/GlassNav'

import { TodayView } from './components/schedunova/dashboard/TodayView'
import { AiHealthInsights } from './components/schedunova/ai/AiHealthInsights'
import { RoutineManager } from './components/schedunova/schedule/RoutineManager'
import { PerformanceTracker } from './components/schedunova/analytics/PerformanceTracker'

import { MOCK_DAILY_PROFILE } from './mock/schedunovaData'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard')

  return (
    <AppLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === 'dashboard' && <TodayView profile={MOCK_DAILY_PROFILE} />}
      {activeTab === 'health-ai' && <AiHealthInsights profile={MOCK_DAILY_PROFILE} />}
      {activeTab === 'schedule' && <RoutineManager profile={MOCK_DAILY_PROFILE} />}
      {activeTab === 'analytics' && <PerformanceTracker profile={MOCK_DAILY_PROFILE} />}
      {activeTab === 'settings' && (
        <div className="flex items-center justify-center h-64 text-white/50">
          Settings module coming soon...
        </div>
      )}
    </AppLayout>
  )
}

export default App
