import React, { useMemo } from 'react'

export const ActivityHeatmap: React.FC = () => {
  const { days, totalSessions, emptyDays } = useMemo(() => {
    const daysArray = []
    let sessions = 0
    const today = new Date()
    
    const currentDayOfWeek = today.getDay() // 0 = Sun, 1 = Mon, ..., 6 = Sat
    
    // Generate exactly 52 weeks worth of columns. 
    // The last column ends on the current day of the week.
    const numDays = 51 * 7 + (currentDayOfWeek + 1)
    
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      
      // Random activity with a bias towards 0 to make it look realistic
      let level = 0
      const rand = Math.random()
      if (rand > 0.85) level = 4
      else if (rand > 0.7) level = 3
      else if (rand > 0.5) level = 2
      else if (rand > 0.3) level = 1
      
      if (level > 0) sessions += level
      daysArray.push({ date: d, level })
    }
    
    const firstDayOfWeek = daysArray[0].date.getDay()
    const empty = Array.from({ length: firstDayOfWeek }).map((_, i) => i)
    
    return { days: daysArray, totalSessions: sessions, emptyDays: empty }
  }, [])

  return (
    <div className="chromatic-border bg-[#09090b] p-8 rounded-none flex flex-col items-center justify-center space-y-6 overflow-hidden">
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-max mx-auto flex flex-col">
          
          {/* Approximate Month Labels */}
          <div className="flex justify-between w-full text-[10px] text-[#fafafa]/50 font-bold uppercase tracking-widest pl-10 mb-2">
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>

          <div className="flex gap-3">
            {/* Day Labels */}
            <div className="grid grid-rows-7 gap-1 text-[10px] text-[#fafafa]/50 font-bold uppercase tracking-widest text-right mt-1">
              <span className="invisible h-3 leading-3">Sun</span>
              <span className="h-3 leading-3">Mon</span>
              <span className="invisible h-3 leading-3">Tue</span>
              <span className="h-3 leading-3">Wed</span>
              <span className="invisible h-3 leading-3">Thu</span>
              <span className="h-3 leading-3">Fri</span>
              <span className="invisible h-3 leading-3">Sat</span>
            </div>

            {/* Grid */}
            <div className="grid grid-rows-7 grid-flow-col gap-1">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="w-3 h-3" />
              ))}
              {days.map((day, i) => {
                let bgClass = 'bg-[#fafafa]/5 border border-[#fafafa]/10'
                if (day.level === 1) bgClass = 'bg-[#fafafa]/20 border border-[#fafafa]/20'
                if (day.level === 2) bgClass = 'bg-[#fafafa]/40 border border-[#fafafa]/40'
                if (day.level === 3) bgClass = 'bg-[#fafafa]/70 border border-[#fafafa]/70'
                if (day.level >= 4) bgClass = 'bg-[#fafafa] shadow-[0_0_8px_rgba(250,250,250,0.5)]'

                return (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-[1px] transition-all duration-300 hover:scale-125 hover:bg-[#fafafa] hover:shadow-[0_0_10px_rgba(250,250,250,0.8)] hover:z-10 cursor-crosshair ${bgClass}`}
                    title={`${day.date.toDateString()}: ${day.level} sessions`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-[10px] text-[#fafafa]/50 uppercase tracking-widest font-bold flex items-center gap-2">
        <span>{Math.floor(totalSessions * 1.5)}h 45m total</span>
        <span className="w-1 h-1 bg-[#fafafa]/30 rounded-none" />
        <span>{totalSessions} sessions</span>
      </div>
    </div>
  )
}
