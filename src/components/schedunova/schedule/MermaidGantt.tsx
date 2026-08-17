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
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const renderChart = async () => {
      // Build the Mermaid syntax string
      let mermaidSyntax = `gantt
    title Today's Routine
    dateFormat YYYY-MM-DDTHH:mm:ss.SSSZ
    axisFormat %H:%M
    todayMarker stroke-width:2px,stroke:#ef4444,opacity:0.8
`

      // Group tasks by subject
      const subjects = Array.from(new Set(tasks.map(t => t.subject)))
      
      subjects.forEach(subject => {
        mermaidSyntax += `    section ${subject}\n`
        const subjectTasks = tasks.filter(t => t.subject === subject)
        
        subjectTasks.forEach((task) => {
          if (!task.startTime || !task.endTime) return
          
          let statusLabel = '' // Default light grey
          if (task.status === 'completed') {
            statusLabel = 'done' // Dark grey
          } else if (task.difficulty === 'intense') {
            statusLabel = 'crit' // Red
          } else if (task.difficulty === 'high') {
            statusLabel = 'active' // Blue
          }

          const escapedTitle = task.title.replace(/:/g, '') // Mermaid breaks on colons in titles
          
          mermaidSyntax += `    ${escapedTitle} :${statusLabel ? statusLabel + ',' : ''} ${task.id}, ${task.startTime}, ${task.endTime}\n`
        })
      })

      try {
        const { svg } = await mermaid.render(`mermaid-gantt-${id}`, mermaidSyntax)
        setSvgContent(svg)
      } catch (error) {
        console.error('Mermaid render error:', error)
      }
    }

    renderChart()
  }, [tasks, id])

  return (
    <div 
      className="chromatic-border bg-[#09090b] p-4 rounded-none overflow-x-auto w-full font-mono"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}
