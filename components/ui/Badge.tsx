import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  domain?: 0 | 1 | 2 | 3 | 4
  variant?: 'default' | 'outline'
  className?: string
}

const domainLabels: Record<number, string> = {
  0: 'Foundations',
  1: 'Security',
  2: 'Resilience',
  3: 'Performance',
  4: 'Cost',
}

export function DomainBadge({ domain }: { domain: 0 | 1 | 2 | 3 | 4 }) {
  return (
    <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full', `domain-badge-${domain}`)}>
      D{domain}: {domainLabels[domain]}
    </span>
  )
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      className
    )}>
      {children}
    </span>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const colors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  }
  return (
    <span className={clsx('text-xs font-medium px-2.5 py-0.5 rounded-full capitalize', colors[difficulty])}>
      {difficulty}
    </span>
  )
}
