import React from 'react'
import { DailyProfile } from '../../../types/schedunova'
import { Calendar as CalendarIcon, Clock, MoreVertical, Plus } from 'lucide-react'
import { MermaidGantt } from './MermaidGantt'

interface RoutineManagerProps {
  profile: DailyProfile
}

export const RoutineManager: React.FC<RoutineManagerProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#fafafa]/10 pb-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#fafafa] flex items-center gap-3 uppercase">
            <CalendarIcon className="w-8 h-8 text-[#fafafa]" />
            Routine Manager
          </h1>
          <p className="text-[#fafafa]/60 font-medium text-sm uppercase tracking-wider">
            Drag, drop, and adjust your study blocks. AI overrides are highlighted.
          </p>
        </div>
        <button className="chromatic-border bg-[#fafafa]/5 text-[#fafafa] px-4 py-2 rounded-none text-sm font-bold flex items-center gap-2 w-fit uppercase tracking-wider hover:bg-[#fafafa] hover:text-[#09090b] transition-colors">
          <Plus className="w-4 h-4" />
          Add Study Block
        </button>
      </header>

      {/* Gantt Chart Visualization */}
      <div className="space-y-2">
        <h2 className="text-[#fafafa] font-bold uppercase tracking-wider text-sm border-l-2 border-[#fafafa] pl-2">Gantt Timeline</h2>
        <MermaidGantt tasks={profile.tasks} />
      </div>

      <div className="chromatic-border bg-[#09090b] rounded-none p-6 min-h-[60vh]">
        <h2 className="text-[#fafafa] font-bold uppercase tracking-wider text-sm mb-6 border-b border-[#fafafa]/10 pb-2">Task Blocks</h2>
        <div className="grid grid-cols-1 gap-4">
          {profile.tasks.map(task => (
            <div key={task.id} className="chromatic-border bg-[#09090b] p-4 rounded-none flex items-center justify-between hover:bg-[#fafafa]/5 transition-colors cursor-grab border-l-4 border-l-[#fafafa]/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-none bg-[#fafafa]/5 flex flex-col items-center justify-center border border-[#fafafa]/20 shrink-0">
                  <span className="text-sm font-bold text-[#fafafa] uppercase">
                    {new Date(task.startTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-[#fafafa]/50 uppercase font-bold tracking-wider">
                    {new Date(task.startTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(' ')[1]}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-base font-bold text-[#fafafa] uppercase tracking-wide">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#fafafa]/50 uppercase font-bold tracking-wider">{task.subject}</span>
                    <span className="w-1 h-1 rounded-none bg-[#fafafa]/20" />
                    <span className="text-[10px] flex items-center gap-1 text-[#fafafa]/80 font-bold uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {task.durationMinutes}m
                    </span>
                    <span className="w-1 h-1 rounded-none bg-[#fafafa]/20" />
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none border border-[#fafafa]/20 text-[#fafafa]">
                      {task.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <button className="p-2 text-[#fafafa]/30 hover:text-[#fafafa] hover:bg-[#fafafa]/10 rounded-none transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
