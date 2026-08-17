import React from 'react'
import { GlassNav, NavTab } from './GlassNav'

interface AppLayoutProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ activeTab, onSelectTab, children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row bg-[#09090b] text-[#fafafa]">
      <GlassNav activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden p-4 md:p-8 z-10 scrollbar-thin">
        <div className="max-w-6xl mx-auto w-full space-y-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  )
}
