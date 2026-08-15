import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react'
import { getModuleMetas, getLessonsForModule } from '@/lib/content'
import { DomainBadge, DifficultyBadge } from '@/components/ui/Badge'

export async function generateStaticParams() {
  const modules = getModuleMetas()
  return modules.map(m => ({ moduleSlug: m.slug }))
}

export default function ModulePage({ params }: { params: { moduleSlug: string } }) {
  const modules = getModuleMetas()
  const mod = modules.find(m => m.slug === params.moduleSlug)
  if (!mod) notFound()

  const lessons = getLessonsForModule(params.moduleSlug)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/learn" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-aws-orange mb-6 transition-colors">
        <ArrowLeft size={14} /> All Modules
      </Link>

      <div className="mb-8">
        <DomainBadge domain={mod.domain} />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-2">{mod.title}</h1>
        <p className="text-slate-500 mb-4">{mod.description}</p>
        <div className="flex gap-4 text-sm text-slate-500">
          <span><Clock size={13} className="inline mr-1" />~{mod.estimatedHours} hours</span>
          <span>{lessons.length} lessons</span>
          {mod.weight > 0 && <span className="font-semibold">{mod.weight}% of exam</span>}
        </div>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/learn/${params.moduleSlug}/${lesson.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl border bg-white dark:bg-slate-800 hover:border-aws-orange hover:shadow-sm transition-all group"
          >
            <span className="text-sm font-mono text-slate-400 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 dark:text-white truncate">{lesson.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <DifficultyBadge difficulty={lesson.difficulty} />
                <span className="text-xs text-slate-400">{lesson.estimatedMinutes} min</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-aws-orange transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      {lessons.length > 0 && (
        <div className="mt-8 text-center">
          <Link href={`/learn/${params.moduleSlug}/${lessons[0].slug}`} className="btn-primary">
            Start First Lesson
          </Link>
        </div>
      )}
    </div>
  )
}
