import Link from 'next/link'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { getModuleMetas } from '@/lib/content'
import { Card } from '@/components/ui/Card'
import { DomainBadge } from '@/components/ui/Badge'

const domainColors = ['bg-slate-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500']

export const metadata = { title: 'Learn' }

export default function LearnPage() {
  const modules = getModuleMetas()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Course Curriculum</h1>
        <p className="text-slate-500">
          {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons across 6 modules, from foundations to exam prep.
        </p>
      </div>

      <div className="space-y-4">
        {modules.map((mod) => (
          <div key={mod.slug} className="rounded-2xl border bg-white dark:bg-slate-800 overflow-hidden">
            <div className={`${domainColors[mod.domain]} h-1.5`} />
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className={`${domainColors[mod.domain]} text-white rounded-xl p-2 shrink-0`}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <DomainBadge domain={mod.domain} />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{mod.title}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{mod.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 shrink-0">
                  <span><Clock size={13} className="inline mr-1" />{mod.estimatedHours}h</span>
                  <span>{mod.lessons.length} lessons</span>
                  {mod.weight > 0 && <span className="font-semibold text-slate-700 dark:text-slate-300">{mod.weight}%</span>}
                </div>
              </div>

              <div className="grid gap-2">
                {mod.lessons.slice(0, 4).map((lesson, i) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${mod.slug}/${lesson.slug}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                  >
                    <span className="text-xs font-mono text-slate-400 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{lesson.title}</span>
                    <span className="text-xs text-slate-400">{lesson.estimatedMinutes}m</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-aws-orange transition-colors" />
                  </Link>
                ))}
                {mod.lessons.length > 4 && (
                  <Link href={`/learn/${mod.slug}`} className="text-sm text-aws-orange hover:underline px-2.5 py-1">
                    View all {mod.lessons.length} lessons →
                  </Link>
                )}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-end">
                <Link
                  href={`/learn/${mod.slug}/${mod.lessons[0]?.slug}`}
                  className="btn-primary text-sm"
                >
                  Start Module
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
