import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { LessonMeta } from '@/types'

interface LessonNavProps {
  prev: LessonMeta | null
  next: LessonMeta | null
  moduleSlug: string
}

export function LessonNav({ prev, next, moduleSlug }: LessonNavProps) {
  return (
    <nav className="flex items-center justify-between mt-12 pt-6 border-t gap-4">
      {prev ? (
        <Link
          href={`/learn/${moduleSlug}/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-aws-orange transition-colors group max-w-xs"
        >
          <ChevronLeft size={16} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Previous</p>
            <p className="font-medium">{prev.title}</p>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          href={`/learn/${moduleSlug}/${next.slug}`}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-aws-orange transition-colors group max-w-xs text-right"
        >
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Next</p>
            <p className="font-medium">{next.title}</p>
          </div>
          <ChevronRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : <div />}
    </nav>
  )
}
