import React from 'react'
import { DailyProfile, StudyTask } from '../../../types/schedunova'
import { Sparkles, Clock, CheckCircle2, Circle, AlertCircle, TrendingUp } from 'lucide-react'

interface TodayViewProps {
  profile: DailyProfile
}

export const TodayView: React.FC<TodayViewProps> = ({ profile }) => {
  const completedTasks = profile.tasks.filter(t => t.status === 'completed').length
  const totalTasks = profile.tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      {/* Header & AI Briefing */}
      <section className="space-y-6">
        <header className="space-y-2 border-b border-[#fafafa]/10 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#fafafa] uppercase">
            Good Morning, Aryan
          </h1>
          <p className="text-[#fafafa]/60 font-medium uppercase tracking-wider text-sm">
            {new Date(profile.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="chromatic-border bg-[#09090b] p-6 rounded-none relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#fafafa]" />
          <div className="flex items-start gap-4 relative z-10 ml-2">
            <div className="w-12 h-12 rounded-none bg-[#fafafa]/5 flex items-center justify-center shrink-0 border border-[#fafafa]/20 chromatic-subtle-glow">
              <Sparkles className="w-6 h-6 text-[#fafafa]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-[#fafafa] uppercase tracking-wider">Nova AI Briefing</h3>
              <p className="text-[#fafafa]/80 leading-relaxed text-sm">
                I noticed your stress level peaked at 8/10 yesterday and you only got 5.5 hours of sleep. 
                <span className="font-bold text-[#fafafa]"> To prevent burnout</span>, I've swapped your intense 2-hour Physics Mock Test with light Chemistry revision today. Let's take it easy.
              </p>
              <div className="pt-2">
                <button className="bg-[#fafafa] text-[#09090b] px-4 py-2 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-[#fafafa]/80 transition-colors">
                  Review Schedule Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="chromatic-border bg-[#09090b] p-5 rounded-none space-y-3">
          <div className="flex justify-between items-center border-b border-[#fafafa]/10 pb-2">
            <div className="w-8 h-8 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
              <CheckCircle2 className="w-4 h-4 text-[#fafafa]" />
            </div>
            <span className="text-[10px] font-bold text-[#fafafa]/50 uppercase tracking-wider">Progress</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#fafafa]">{Math.round(progress)}%</h4>
            <p className="text-[10px] text-[#fafafa]/50 uppercase">{completedTasks} of {totalTasks} tasks done</p>
          </div>
        </div>

        <div className="chromatic-border bg-[#09090b] p-5 rounded-none space-y-3">
          <div className="flex justify-between items-center border-b border-[#fafafa]/10 pb-2">
            <div className="w-8 h-8 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
              <AlertCircle className="w-4 h-4 text-[#fafafa]" />
            </div>
            <span className="text-[10px] font-bold text-[#fafafa]/50 uppercase tracking-wider">Stress Level</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#fafafa]">{profile.health.averageStressThisWeek}/10</h4>
            <p className="text-[10px] text-[#fafafa]/70 uppercase">High Burnout Risk</p>
          </div>
        </div>
        
        <div className="chromatic-border bg-[#09090b] p-5 rounded-none space-y-3">
          <div className="flex justify-between items-center border-b border-[#fafafa]/10 pb-2">
            <div className="w-8 h-8 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
              <TrendingUp className="w-4 h-4 text-[#fafafa]" />
            </div>
            <span className="text-[10px] font-bold text-[#fafafa]/50 uppercase tracking-wider">Consistency</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#fafafa]">85%</h4>
            <p className="text-[10px] text-[#fafafa]/70 uppercase">+5% this week</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-[#fafafa] uppercase tracking-wider border-b border-[#fafafa]/10 pb-2">
          Today's Optimized Routine
        </h3>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-[#fafafa]/20">
          
          {profile.tasks.map((task, index) => {
            const isCompleted = task.status === 'completed'
            const isIntense = task.difficulty === 'intense' || task.difficulty === 'high'

            return (
              <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-none border border-[#fafafa]/30 bg-[#09090b] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-5 md:ml-0 z-10 chromatic-subtle-glow">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#fafafa]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#fafafa]/30" />
                  )}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-8 md:pl-0">
                  <div className={`chromatic-border bg-[#09090b] p-5 rounded-none border-l-2 transition-all hover:scale-[1.02] cursor-pointer ${
                    isCompleted ? 'border-l-[#fafafa]/50 opacity-60' : 
                    isIntense ? 'border-l-[#fafafa]' : 'border-l-[#fafafa]/80'
                  }`}>
                    <div className="flex justify-between items-start mb-2 border-b border-[#fafafa]/10 pb-2">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-none uppercase tracking-wider bg-[#fafafa]/10 text-[#fafafa]">
                        {task.subject}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-[#fafafa]/50 font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {task.durationMinutes}m
                      </div>
                    </div>
                    <h4 className={`text-sm font-bold uppercase tracking-wide mt-2 ${isCompleted ? 'line-through text-[#fafafa]/50' : 'text-[#fafafa]'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-[#fafafa]/60 mt-2 uppercase tracking-wider">
                      Difficulty: <span className="font-bold">{task.difficulty}</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
