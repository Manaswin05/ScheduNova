import React from 'react'
import { DailyProfile } from '../../../types/schedunova'
import { Brain, HeartPulse, Zap, AlertTriangle, Check } from 'lucide-react'

interface AiHealthInsightsProps {
  profile: DailyProfile
}

export const AiHealthInsights: React.FC<AiHealthInsightsProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      <header className="space-y-2 border-b border-[#fafafa]/10 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#fafafa] flex items-center gap-3 uppercase">
          <Brain className="w-8 h-8 text-[#fafafa]" />
          Nova AI Insights
        </h1>
        <p className="text-[#fafafa]/60 font-medium max-w-2xl text-sm uppercase tracking-wider">
          Continuous monitoring of your cognitive load, stress levels, and study efficiency to keep you in the optimal learning zone.
        </p>
      </header>

      {/* Health Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4">
          <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
            <HeartPulse className="w-5 h-5 text-[#fafafa]" />
          </div>
          <div>
            <h3 className="text-[#fafafa]/50 text-[10px] font-bold uppercase tracking-wider">Cognitive Stress</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#fafafa]">{profile.health.averageStressThisWeek}<span className="text-xl text-[#fafafa]/50">/10</span></p>
              <span className="text-[10px] font-bold text-[#fafafa] mb-1 uppercase tracking-wider border border-[#fafafa]/20 px-1 py-0.5">Elevated</span>
            </div>
          </div>
          <div className="w-full bg-[#fafafa]/10 h-1 rounded-none overflow-hidden">
            <div className="bg-[#fafafa] w-[75%] h-full rounded-none" />
          </div>
        </div>

        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4">
          <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
            <Zap className="w-5 h-5 text-[#fafafa]" />
          </div>
          <div>
            <h3 className="text-[#fafafa]/50 text-[10px] font-bold uppercase tracking-wider">Sleep Debt</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#fafafa]">{profile.health.sleepHoursLastNight}<span className="text-xl text-[#fafafa]/50">h</span></p>
              <span className="text-[10px] font-bold text-[#fafafa] mb-1 uppercase tracking-wider border border-[#fafafa]/20 px-1 py-0.5">-2.5h avg</span>
            </div>
          </div>
          <div className="w-full bg-[#fafafa]/10 h-1 rounded-none overflow-hidden">
            <div className="bg-[#fafafa] w-[55%] h-full rounded-none" />
          </div>
        </div>

        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4">
          <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
            <Brain className="w-5 h-5 text-[#fafafa]" />
          </div>
          <div>
            <h3 className="text-[#fafafa]/50 text-[10px] font-bold uppercase tracking-wider">Procrastination</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#fafafa]">{profile.health.procrastinationIndex}<span className="text-xl text-[#fafafa]/50">/10</span></p>
              <span className="text-[10px] font-bold text-[#fafafa] mb-1 uppercase tracking-wider border border-[#fafafa]/20 px-1 py-0.5">Spiking</span>
            </div>
          </div>
          <div className="w-full bg-[#fafafa]/10 h-1 rounded-none overflow-hidden">
            <div className="bg-[#fafafa] w-[80%] h-full rounded-none" />
          </div>
        </div>

        <div className="chromatic-border bg-[#09090b] p-6 rounded-none space-y-4 border-l-4 border-l-[#fafafa]">
          <div className="w-10 h-10 rounded-none bg-[#fafafa]/5 flex items-center justify-center border border-[#fafafa]/20">
            <AlertTriangle className="w-5 h-5 text-[#fafafa]" />
          </div>
          <div>
            <h3 className="text-[#fafafa]/50 text-[10px] font-bold uppercase tracking-wider">Burnout Risk</h3>
            <p className="text-3xl font-bold text-[#fafafa] uppercase tracking-wide">{profile.health.burnoutRisk}</p>
          </div>
          <p className="text-[10px] text-[#fafafa]/60 uppercase tracking-wider">Intervention required to prevent crash.</p>
        </div>
      </div>

      {/* Agentic Recommendations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#fafafa] uppercase tracking-wider border-b border-[#fafafa]/10 pb-2">Suggested Interventions</h2>
        <div className="grid grid-cols-1 gap-4">
          {profile.recommendations.map(rec => (
            <div key={rec.id} className="chromatic-border bg-[#09090b] p-6 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#fafafa]/5 transition-colors">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider bg-[#fafafa] text-[#09090b]">
                    {rec.type}
                  </span>
                  <span className="text-[10px] text-[#fafafa]/40 font-bold tracking-wider">
                    {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#fafafa] uppercase tracking-wide">{rec.title}</h3>
                <p className="text-sm text-[#fafafa]/70 leading-relaxed max-w-3xl">
                  {rec.description}
                </p>
              </div>
              
              {rec.suggestedAction && !rec.isApplied && (
                <div className="shrink-0">
                  <button className="w-full md:w-auto chromatic-border bg-[#fafafa]/5 hover:bg-[#fafafa] hover:text-[#09090b] text-[#fafafa] px-6 py-3 rounded-none font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                    <Check className="w-4 h-4" />
                    {rec.suggestedAction.actionLabel}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
