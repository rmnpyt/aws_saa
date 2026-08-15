import { Clock, BookOpen } from 'lucide-react'
import { DomainBadge, DifficultyBadge } from '@/components/ui/Badge'
import type { LessonMeta } from '@/types'

export function LessonHeader({ meta }: { meta: LessonMeta }) {
  return (
    <div className="mb-8 pb-6 border-b">
      <div className="flex flex-wrap gap-2 mb-3">
        <DomainBadge domain={meta.domain} />
        <DifficultyBadge difficulty={meta.difficulty} />
        {meta.taskStatements.map(ts => (
          <span key={ts} className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
            Task {ts}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{meta.title}</h1>
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1"><Clock size={13} /> {meta.estimatedMinutes} min read</span>
        <span className="flex items-center gap-1"><BookOpen size={13} /> {meta.services.length} services covered</span>
      </div>
      {meta.services.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {meta.services.map(s => (
            <span key={s} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
