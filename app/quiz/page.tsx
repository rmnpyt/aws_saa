import Link from 'next/link'
import { Brain, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const quizzes = [
  { slug: 'domain-0-foundations', domain: 0, title: 'Foundations', description: 'Cloud basics, networking, and AWS fundamentals.', questions: 20, color: 'bg-slate-500', badge: 'domain-badge-0' },
  { slug: 'domain-1-security', domain: 1, title: 'Domain 1 – Secure Architectures', description: 'IAM, VPC, encryption, and threat detection. 30% of the exam.', questions: 40, color: 'bg-blue-500', badge: 'domain-badge-1' },
  { slug: 'domain-2-resilience', domain: 2, title: 'Domain 2 – Resilient Architectures', description: 'ELB, Auto Scaling, SQS/SNS, DR strategies. 26% of the exam.', questions: 35, color: 'bg-green-500', badge: 'domain-badge-2' },
  { slug: 'domain-3-performance', domain: 3, title: 'Domain 3 – High-Performing Architectures', description: 'EC2, EBS, databases, CloudFront, Kinesis. 24% of the exam.', questions: 35, color: 'bg-purple-500', badge: 'domain-badge-3' },
  { slug: 'domain-4-cost', domain: 4, title: 'Domain 4 – Cost-Optimized Architectures', description: 'Purchasing options, S3 tiers, cost tools. 20% of the exam.', questions: 25, color: 'bg-amber-500', badge: 'domain-badge-4' },
]

export const metadata = { title: 'Quizzes' }

export default function QuizPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Practice Quizzes</h1>
        <p className="text-slate-500">Choose a domain to quiz. Each session draws 15 random questions with full explanations.</p>
      </div>

      <div className="space-y-4">
        {quizzes.map(q => (
          <Link key={q.slug} href={`/quiz/${q.slug}`}>
            <Card hover className="flex items-center gap-4">
              <div className={`${q.color} text-white rounded-xl p-3 shrink-0`}>
                <Brain size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white">{q.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{q.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-slate-400">{q.questions} questions</span>
                <ArrowRight size={16} className="text-slate-300" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300">
        <strong>Tip:</strong> Each quiz draws 15 random questions from the pool. Retake quizzes to see different questions and reinforce weaker areas.
      </div>
    </div>
  )
}
