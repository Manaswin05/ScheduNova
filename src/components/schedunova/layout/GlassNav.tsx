import React from 'react'
import { Calendar, LayoutDashboard, Brain, Activity, Settings } from 'lucide-react'

export type NavTab = 'dashboard' | 'health-ai' | 'schedule' | 'analytics' | 'settings'

interface GlassNavProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Today', icon: LayoutDashboard },
  { id: 'health-ai', label: 'Nova AI', icon: Brain },
  { id: 'schedule', label: 'Routine', icon: Calendar },
  { id: 'analytics', label: 'Progress', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

export const GlassNav: React.FC<GlassNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen border-r border-[#fafafa]/10 bg-[#09090b] z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-none border border-[#fafafa]/20 bg-[#09090b] flex items-center justify-center chromatic-subtle-glow">
            <Brain className="w-5 h-5 text-[#fafafa]" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-[#fafafa] uppercase">ScheduNova</h1>
            <p className="text-[10px] uppercase tracking-wider text-[#fafafa]/50 font-medium font-mono">SYS // MGR</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-300 font-mono text-sm uppercase tracking-wider ${
                  isActive 
                    ? 'bg-[#fafafa] text-[#09090b] shadow-sm' 
                    : 'text-[#fafafa]/60 hover:text-[#fafafa] hover:bg-[#fafafa]/5 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#09090b]' : 'text-[#fafafa]/50'}`} />
                <span className="font-semibold">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-6 border-t border-[#fafafa]/10">
          <div className="flex items-center gap-3 chromatic-badge p-2">
            <div className="w-9 h-9 rounded-none bg-[#fafafa]/10 overflow-hidden border border-[#fafafa]/20">
              <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="text-left font-mono">
              <p className="text-xs font-semibold text-[#fafafa]">USR_ARYAN</p>
              <p className="text-[10px] text-[#fafafa]/50">TGT_2026</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#09090b] border-t border-[#fafafa]/10 z-50 flex items-center justify-around px-2 pb-safe">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center gap-1 p-2 min-w-[64px]"
            >
              <div className={`p-2 rounded-none transition-all ${isActive ? 'bg-[#fafafa] text-[#09090b]' : 'text-[#fafafa]/50'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider transition-colors ${isActive ? 'text-[#fafafa]' : 'text-[#fafafa]/50'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
