import React, { useState } from 'react'
import {
  Search,
  Bell,
  Sparkles,
  Command,
  Download,
  Calendar,
  Activity,
  Layers
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface HeaderProps {
  title: string
  subtitle?: string
  onOpenCommand: () => void
  onExportData: () => void
  totalPipelineValue: number
  activeDealsCount: number
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onOpenCommand,
  onExportData,
  totalPipelineValue,
  activeDealsCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, text: 'Hyperion Aerospace moved to Negotiation ($185k)', time: '10m ago', unread: true },
    { id: 2, text: 'Gantt milestone: "Core Release v3.0" is 95% complete', time: '1h ago', unread: true },
    { id: 3, text: 'Activity Heatmap streak achieved: 18 consecutive active days', time: '4h ago', unread: false },
  ]

  return (
    <header className="h-16 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Title & Context */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            {title}
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </h1>
          {subtitle && <p className="text-[11px] text-zinc-400 font-mono">{subtitle}</p>}
        </div>
      </div>

      {/* Global Command Bar & Right Actions */}
      <div className="flex items-center gap-3">
        {/* Quick KPI pills */}
        <div className="hidden lg:flex items-center gap-2 border-r border-zinc-800 pr-4 mr-1 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-400">Deals:</span>
            <span className="text-white font-bold">{activeDealsCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
            <Activity className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-400">Pipeline:</span>
            <span className="text-white font-bold">${(totalPipelineValue / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Search / Command Trigger */}
        <button
          onClick={onOpenCommand}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-zinc-800 bg-[#121216] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all text-xs w-48 sm:w-64"
        >
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="flex-1 text-left truncate">Search leads, tasks, metrics...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* Export Data */}
        <Button variant="outline" size="sm" onClick={onExportData} title="Export JSON / CSV Report">
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </Button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-zinc-800 bg-[#121215] shadow-2xl p-4 z-50 text-xs animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                <span className="font-bold text-white uppercase font-mono tracking-wider text-[11px]">
                  Realtime Feed
                </span>
                <span className="text-[10px] text-zinc-500">3 new</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <p className="text-zinc-200 font-medium leading-snug">{n.text}</p>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
