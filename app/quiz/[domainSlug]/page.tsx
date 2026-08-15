import { notFound } from 'next/navigation'
import { getQuestions } from '@/lib/content'
import { QuizSession } from '@/components/quiz/QuizSession'

const domainNames: Record<string, string> = {
  'domain-0-foundations': 'Foundations',
  'domain-1-security': 'Domain 1 – Secure Architectures',
  'domain-2-resilience': 'Domain 2 – Resilient Architectures',
  'domain-3-performance': 'Domain 3 – High-Performing Architectures',
  'domain-4-cost': 'Domain 4 – Cost-Optimized Architectures',
}

export default function QuizDomainPage({ params }: { params: { domainSlug: string } }) {
  const questions = getQuestions(params.domainSlug)
  const domainName = domainNames[params.domainSlug]
  if (!domainName || questions.length === 0) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{domainName}</h1>
        <p className="text-slate-500 mt-1">Quiz — 15 questions, no time limit, full explanations after each answer.</p>
      </div>
      <QuizSession questions={questions} domainKey={params.domainSlug} domainName={domainName} />
    </div>
  )
}
