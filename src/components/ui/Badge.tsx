import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'dot' | 'high-contrast' | 'won' | 'lead' | 'qualified'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'border border-zinc-700 bg-zinc-800/80 text-zinc-300 font-medium',
      secondary: 'border border-zinc-800 bg-zinc-900/60 text-zinc-400',
      outline: 'border border-zinc-700 text-zinc-300',
      'high-contrast': 'border border-white/20 bg-white text-zinc-950 font-bold',
      dot: 'border border-zinc-700 bg-zinc-900/80 text-zinc-300 pl-2 pr-2.5 py-0.5 flex items-center gap-1.5',
      won: 'border border-zinc-500/50 bg-zinc-100 text-zinc-950 font-semibold shadow-sm',
      lead: 'border border-zinc-700/60 bg-zinc-850 text-zinc-400',
      qualified: 'border border-zinc-600 bg-zinc-800 text-zinc-200'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono tracking-tight transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {variant === 'dot' && (
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        )}
        {children}
      </div>
    )
  }
)
Badge.displayName = 'Badge'
