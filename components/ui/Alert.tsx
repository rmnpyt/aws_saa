import { clsx } from 'clsx'
import { AlertCircle, CheckCircle, Info, Lightbulb, Target } from 'lucide-react'

type AlertVariant = 'info' | 'success' | 'warning' | 'tip' | 'exam'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
}

const config: Record<AlertVariant, { icon: React.FC<any>; classes: string; label: string }> = {
  info: { icon: Info, classes: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200', label: 'Note' },
  success: { icon: CheckCircle, classes: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200', label: 'Good to know' },
  warning: { icon: AlertCircle, classes: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200', label: 'Important' },
  tip: { icon: Lightbulb, classes: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200', label: 'Tip' },
  exam: { icon: Target, classes: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-200', label: 'Exam Tip' },
}

export function Alert({ variant = 'info', title, children }: AlertProps) {
  const { icon: Icon, classes, label } = config[variant]
  return (
    <div className={clsx('my-4 rounded-lg border p-4', classes)}>
      <div className="flex gap-3">
        <Icon size={18} className="shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-1">{title ?? label}</p>
          <div className="opacity-90">{children}</div>
        </div>
      </div>
    </div>
  )
}
