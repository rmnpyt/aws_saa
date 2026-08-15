import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getLessonContent, getAdjacentLessons, getModuleMetas } from '@/lib/content'
import { LessonHeader } from '@/components/lesson/LessonHeader'
import { LessonNav } from '@/components/lesson/LessonNav'
import { MarkComplete } from '@/components/lesson/MarkComplete'
import { ExamTip, KeyConcept, ServiceCard, ComparisonTable, Diagram } from '@/components/lesson/ExamTip'
import { Alert } from '@/components/ui/Alert'

export async function generateStaticParams() {
  const modules = getModuleMetas()
  return modules.flatMap(m =>
    m.lessons.map(l => ({ moduleSlug: m.slug, lessonSlug: l.slug }))
  )
}

const mdxComponents = {
  ExamTip,
  KeyConcept,
  ServiceCard,
  ComparisonTable,
  Diagram,
  Alert,
}

export default function LessonPage({ params }: { params: { moduleSlug: string; lessonSlug: string } }) {
  const result = getLessonContent(params.moduleSlug, params.lessonSlug)
  if (!result) notFound()

  const { meta, content } = result
  const { prev, next } = getAdjacentLessons(params.moduleSlug, params.lessonSlug)
  const lessonKey = `${params.moduleSlug}/${params.lessonSlug}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <LessonHeader meta={meta} />

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      <div className="mt-10 pt-6 border-t flex items-center justify-between">
        <MarkComplete lessonKey={lessonKey} />
        <div className="flex gap-2">
          {meta.services.length > 0 && (
            <a
              href={`/quiz/${meta.domain === 0 ? 'domain-0-foundations' : `domain-${meta.domain}`}`}
              className="btn-secondary text-sm"
            >
              Quiz this domain
            </a>
          )}
        </div>
      </div>

      <LessonNav prev={prev} next={next} moduleSlug={params.moduleSlug} />
    </div>
  )
}
