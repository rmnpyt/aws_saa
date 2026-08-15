import { clsx } from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ value, max = 100, className, color, showLabel, size = 'md' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }
  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden', heights[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', color ?? 'bg-aws-orange')}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-slate-500 mt-1 text-right">{pct}%</p>
      )}
    </div>
  )
}

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function CircularProgress({ value, size = 80, strokeWidth = 8, color = '#FF9900', label }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-slate-200 dark:text-slate-700" />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{value}%</span>
        </div>
      </div>
      {label && <span className="text-xs text-slate-500 text-center">{label}</span>}
    </div>
  )
}
