import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'chromatic'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]'

    const variants = {
      primary: 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm font-semibold',
      secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/60',
      outline: 'border border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800/80 hover:text-white',
      ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60',
      destructive: 'bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800',
      chromatic: 'bg-gradient-to-b from-white to-zinc-200 text-black border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.25)] font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
    }

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-9 px-4 py-2 text-xs gap-2',
      lg: 'h-10 px-6 text-sm gap-2.5',
      icon: 'h-8 w-8 p-0',
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
