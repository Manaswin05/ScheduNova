import React from 'react'
import {
  LayoutDashboard,
  Kanban,
  CalendarRange,
  Flame,
  LineChart,
  Users,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { cn } from '../../lib/utils'

export type NavTab = 'crm-overview' | 'pipeline' | 'contacts' | 'scheduling' | 'heatmap' | 'github' | 'analytics' | 'settings'

interface SidebarProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  onQuickAddDeal: () => void
  onQuickAddTask: () => void
}

interface NavItem {
  id: NavTab
  label: string
  icon: any
  badge?: string
  highlight?: boolean
}

interface NavGroup {
  group: string
  items: NavItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  onQuickAddDeal,
  onQuickAddTask
}) => {
  const navItems: NavGroup[] = [
    {
      group: 'Core Platform',
      items: [
        { id: 'crm-overview', label: 'CRM Executive', icon: LayoutDashboard, badge: 'Live' },
        { id: 'pipeline', label: 'Sales Pipeline', icon: Kanban, badge: '7' },
        { id: 'contacts', label: 'Accounts & Leads', icon: Users },
      ]
    },
    {
      group: 'Roadmap & Tracking',
      items: [
        { id: 'scheduling', label: 'Gantt Schedule', icon: CalendarRange, highlight: true },
        { id: 'heatmap', label: 'Activity Heatmap', icon: Flame, badge: '365d' },
        { id: 'github', label: 'GitHub Explorer', icon: GithubIcon, badge: 'Matrix', highlight: true },
      ]
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'analytics', label: 'Revenue Analytics', icon: LineChart },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ]
    }
  ]

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-zinc-800/80 bg-[#09090b] text-zinc-300 transition-all duration-300 z-30 select-none',
        isCollapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800/80">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black tracking-tighter text-sm shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              Æ
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                AETHEL
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">v2.4</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">CHROMATIC CRM</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-sm shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            Æ
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      {!isCollapsed && (
        <div className="p-3 border-b border-zinc-850 space-y-1.5">
          <button
            onClick={onQuickAddDeal}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_12px_rgba(255,255,255,0.2)] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <Plus className="h-3.5 w-3.5" />
              New Deal
            </span>
            <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-mono font-normal">⌘N</span>
          </button>
          <button
            onClick={onQuickAddTask}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700/70 text-zinc-200 font-medium text-xs hover:bg-zinc-800 hover:text-white transition-all active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <CalendarRange className="h-3.5 w-3.5 text-zinc-400" />
              Add Gantt Event
            </span>
            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-zinc-400">⌘G</span>
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navItems.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative',
                    isActive
                      ? 'bg-zinc-800/90 text-white border border-zinc-700/80 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60',
                    isCollapsed && 'justify-center px-0'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110',
                      isActive ? 'text-white' : 'text-zinc-400',
                      item.highlight && !isActive && 'text-zinc-200'
                    )}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-mono px-1.5 py-0.5 rounded',
                            isActive
                              ? 'bg-white text-black font-bold'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active Indicator Strip */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* System Status / User Footer */}
      <div className="p-3 border-t border-zinc-800/80 bg-[#0c0c0e]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-8 w-8 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  SV
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-white border-2 border-black" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white">Surya N.</p>
                <p className="text-[10px] text-zinc-500 font-mono">Managing Director</p>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="w-full flex justify-center py-1 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  )
}
