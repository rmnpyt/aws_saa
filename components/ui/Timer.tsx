'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { clsx } from 'clsx'

interface TimerProps {
  durationSeconds: number
  onExpire?: () => void
}

export function Timer({ durationSeconds, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(interval); onExpire?.(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [onExpire])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const pct = remaining / durationSeconds
  const urgent = pct < 0.1

  return (
    <div className={clsx(
      'flex items-center gap-2 font-mono text-sm font-semibold px-3 py-1.5 rounded-lg',
      urgent ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    )}>
      <Clock size={14} />
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
