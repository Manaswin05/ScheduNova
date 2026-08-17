import React, { useEffect, useRef, useState, useId } from 'react'
import mermaid from 'mermaid'
import { StudyTask } from '../../../types/schedunova'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: 'transparent',
    fontFamily: 'JetBrains Mono, monospace',
    textColor: '#fafafa'
  },
  gantt: {
    axisFormat: '%H:%M'
  }
})

interface MermaidGanttProps {
  tasks: StudyTask[]
}

export const MermaidGantt: React.FC<MermaidGanttProps> = ({ tasks }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const id = useId().replace(/:/g, '')

  const scheduledTasks = tasks.filter(t => t.startTime && t.endTime)

  useEffect(() => {
    if (scheduledTasks.length === 0) {
      setSvgContent('')
      return
    }

    const renderChart = async () => {
      setError(null)
      let mermaidSyntax = `gantt
    title Today's Routine
    dateFormat YYYY-MM-DDTHH:mm:ss.SSSZ
    axisFormat %H:%M
    todayMarker stroke-width:2px,stroke:#ef4444,opacity:0.8
`

      const subjects = Array.from(new Set(scheduledTasks.map(t => t.subject)))
      subjects.forEach(subject => {
        mermaidSyntax += `    section ${subject}\n`
        scheduledTasks
          .filter(t => t.subject === subject)
          .forEach(task => {
            let statusLabel = ''
            if (task.status === 'completed') statusLabel = 'done'
            else if (task.difficulty === 'intense') statusLabel = 'crit'
            else if (task.difficulty === 'high') statusLabel = 'active'

            const escapedTitle = task.title.replace(/:/g, '')
            mermaidSyntax += `    ${escapedTitle} :${statusLabel ? statusLabel + ',' : ''} ${task.id}, ${task.startTime}, ${task.endTime}\n`
          })
      })

      try {
        const { svg } = await mermaid.render(`mermaid-gantt-${id}`, mermaidSyntax)
        setSvgContent(svg)
      } catch (err) {
        console.error('Mermaid render error:', err)
        setError('Unable to render the Gantt chart. Please check task data.')
      }
    }

    renderChart()
  }, [tasks, id, scheduledTasks.length])

  if (scheduledTasks.length === 0) {
    return (
      <div className="chromatic-border bg-[#09090b] p-8 rounded-none flex items-center justify-center font-mono text-[#fafafa]/30 text-xs uppercase tracking-widest">
        No scheduled tasks — add start & end times to see the Gantt chart.
      </div>
    )
  }

  if (error) {
    return (
      <div className="chromatic-border bg-[#09090b] p-8 rounded-none flex items-center justify-center font-mono text-[#fafafa]/40 text-xs uppercase tracking-widest">
        {error}
      </div>
    )
  }

  return (
    <div
      className="chromatic-border bg-[#09090b] p-4 rounded-none overflow-x-auto w-full font-mono"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svgContent || '<div style="height:80px" />' }}
    />
  )
}
