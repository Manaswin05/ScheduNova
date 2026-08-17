import React, { useState, useEffect } from 'react'
import {
  Search,
  LayoutDashboard,
  Kanban,
  CalendarRange,
  Flame,
  LineChart,
  Users,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { NavTab } from './Sidebar'
import { Deal, GanttTask } from '../../types'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onSelectTab: (tab: NavTab) => void
  onAddDeal: () => void
  onAddTask: () => void
  deals: Deal[]
  tasks: GanttTask[]
  onSelectDeal: (deal: Deal) => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onSelectTab,
  onAddDeal,
  onAddTask,
  deals,
  tasks,
  onSelectDeal
}) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
        else setQuery('')
      }
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const filteredDeals = deals.filter(d =>
    d.company.toLowerCase().includes(query.toLowerCase()) ||
    d.contactName.toLowerCase().includes(query.toLowerCase())
  )

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-xl rounded-2xl border border-zinc-700 bg-[#0e0e12] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-zinc-800 bg-[#141418]">
          <Search className="h-4 w-4 text-zinc-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search accounts, tasks, metrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-mono"
          />
          <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Content List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 mb-1.5">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onAddDeal()
                  onClose()
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-xs text-zinc-200 group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="h-4 w-4 text-white" />
                  <span>Create New Enterprise Deal</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => {
                  onAddTask()
                  onClose()
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-xs text-zinc-200 group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarRange className="h-4 w-4 text-zinc-400" />
                  <span>Add Gantt Schedule Milestone</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Navigation Jump */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 mb-1.5">
              Jump To Module
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'crm-overview' as NavTab, label: 'CRM Executive', icon: LayoutDashboard },
                { id: 'pipeline' as NavTab, label: 'Sales Pipeline Kanban', icon: Kanban },
                { id: 'scheduling' as NavTab, label: 'Interactive Gantt Chart', icon: CalendarRange },
                { id: 'heatmap' as NavTab, label: 'Activity Progress Heatmap', icon: Flame },
                { id: 'github' as NavTab, label: 'GitHub Explorer & Heatmap', icon: GithubIcon },
                { id: 'analytics' as NavTab, label: 'Revenue Analytics', icon: LineChart },
                { id: 'contacts' as NavTab, label: 'Accounts & Leads Directory', icon: Users },
              ].map((m) => {
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectTab(m.id)
                      onClose()
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 transition-colors text-left"
                  >
                    <Icon className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="truncate">{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search Results - Deals */}
          {filteredDeals.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 mb-1.5">
                Deals ({filteredDeals.length})
              </div>
              <div className="space-y-1">
                {filteredDeals.slice(0, 3).map((deal) => (
                  <button
                    key={deal.id}
                    onClick={() => {
                      onSelectDeal(deal)
                      onClose()
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-xs text-zinc-300 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-white">{deal.company}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">{deal.contactName} • {deal.stage.toUpperCase()}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">${(deal.value / 1000).toFixed(0)}k</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results - Gantt Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 mb-1.5">
                Gantt Timeline Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1">
                {filteredTasks.slice(0, 3).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => {
                      onSelectTab('scheduling')
                      onClose()
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-xs text-zinc-300 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-white">{task.title}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">{task.category} • {task.startDate} to {task.endDate}</p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {task.progress}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
