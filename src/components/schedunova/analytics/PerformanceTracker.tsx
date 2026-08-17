import React from 'react'
import { DailyProfile } from '../../../types/schedunova'
import { HISTORICAL_PERFORMANCE } from '../../../mock/schedunovaData'
import { Activity, Target, Trophy, Flame } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ActivityHeatmap } from './ActivityHeatmap'

interface PerformanceTrackerProps {
  profile: DailyProfile
}

export const PerformanceTracker: React.FC<PerformanceTrackerProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      <header className="space-y-2 border-b border-[#fafafa]/10 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#fafafa] flex items-center gap-3 uppercase">
          <Activity className="w-8 h-8 text-[#fafafa]" />
          Performance & Analytics
        </h1>
        <p className="text-[#fafafa]/60 font-medium text-sm uppercase tracking-wider">
          Track your gradual improvement, performance speed, and procrastination trends over time.
        </p>
      </header>

      <ActivityHeatmap />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Consistency Score */}
        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4 hover:bg-[#fafafa]/5 transition-colors">
          <div className="flex items-center gap-3 mb-2 border-b border-[#fafafa]/10 pb-2">
            <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
              <Flame className="w-5 h-5 text-[#fafafa]" />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] uppercase tracking-wider">Consistency Streak</h3>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-5xl font-black text-[#fafafa]">12<span className="text-2xl text-[#fafafa]/50 font-bold uppercase tracking-wider ml-2">days</span></p>
          </div>
          <p className="text-[10px] text-[#fafafa]/60 uppercase tracking-wider">
            You've completed at least 80% of your scheduled tasks for 12 consecutive days.
          </p>
        </div>

        {/* Target Progress */}
        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4 hover:bg-[#fafafa]/5 transition-colors">
          <div className="flex items-center gap-3 mb-2 border-b border-[#fafafa]/10 pb-2">
            <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
              <Target className="w-5 h-5 text-[#fafafa]" />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] uppercase tracking-wider">Target Accuracy</h3>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-5xl font-black text-[#fafafa]">78<span className="text-2xl text-[#fafafa]/50 font-bold uppercase tracking-wider ml-1">%</span></p>
          </div>
          <p className="text-[10px] text-[#fafafa]/60 uppercase tracking-wider">
            Average accuracy across Physics and Math mock tests this week. Up 4% from last week.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Speed Graph */}
        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-6">
          <div className="border-b border-[#fafafa]/10 pb-2">
            <h3 className="text-lg font-bold text-[#fafafa] uppercase tracking-wider">Performance Speed</h3>
            <p className="text-[10px] text-[#fafafa]/50 uppercase tracking-wider">Completion time vs Estimated time (lower is faster)</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,250,250,0.1)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(250,250,250,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.toUpperCase()} />
                <YAxis stroke="rgba(250,250,250,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(250,250,250,0.2)', borderRadius: '0', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                <Line type="monotone" dataKey="speed" stroke="#fafafa" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4, fill: '#09090b', stroke: '#fafafa', strokeWidth: 2 }} name="Speed Multiplier" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Procrastination Index Graph */}
        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-6">
          <div className="border-b border-[#fafafa]/10 pb-2">
            <h3 className="text-lg font-bold text-[#fafafa] uppercase tracking-wider">Procrastination Index</h3>
            <p className="text-[10px] text-[#fafafa]/50 uppercase tracking-wider">Delay in starting scheduled tasks (1-10)</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProcrastinationMono" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fafafa" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#fafafa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,250,250,0.1)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(250,250,250,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.toUpperCase()} />
                <YAxis stroke="rgba(250,250,250,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(250,250,250,0.2)', borderRadius: '0', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area type="monotone" dataKey="procrastination" stroke="#fafafa" strokeWidth={2} fillOpacity={1} fill="url(#colorProcrastinationMono)" name="Index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="chromatic-border bg-[#09090b] p-8 rounded-none min-h-[150px] flex flex-col items-center justify-center text-center space-y-4 chromatic-badge">
        <Trophy className="w-12 h-12 text-[#fafafa]" />
        <div>
          <h3 className="text-xl font-bold text-[#fafafa] mb-2 uppercase tracking-wide">You are on track</h3>
          <p className="text-[#fafafa]/60 max-w-md mx-auto text-[10px] uppercase tracking-wider font-bold">
            Based on your current study velocity and test scores, Nova AI predicts a 95th percentile outcome if you maintain this consistency.
          </p>
        </div>
      </div>
    </div>
  )
}
