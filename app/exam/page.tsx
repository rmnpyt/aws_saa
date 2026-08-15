import Link from 'next/link'
import { Layers, Clock, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const exams = [
  { id: 'practice-exam-1', title: 'Practice Exam 1', description: 'Full 65-question mock exam with questions from all 4 domains, proportionally weighted.', difficulty: 'Standard' },
  { id: 'practice-exam-2', title: 'Practice Exam 2', description: 'A second set of 65 original questions. Good for your second or third attempt.', difficulty: 'Standard' },
  { id: 'practice-exam-3', title: 'Practice Exam 3', description: 'Third full mock exam. Slightly harder mix of questions to stress-test your readiness.', difficulty: 'Challenging' },
]

export const metadata = { title: 'Practice Exams' }

export default function ExamPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Practice Exams</h1>
        <p className="text-slate-500">Full 65-question timed exams that simulate the real SAA-C03 experience.</p>
      </div>

      <div className="grid gap-4 mb-8">
        {exams.map(exam => (
          <Link key={exam.id} href={`/exam/${exam.id}`}>
            <Card hover className="flex items-start gap-4">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3 shrink-0">
                <Layers size={20} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{exam.title}</h3>
                <p className="text-sm text-slate-500">{exam.description}</p>
                <div className="flex gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> 130 minutes</span>
                  <span>65 questions</span>
                  <span>{exam.difficulty}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-900 dark:text-amber-300">
            <p className="font-semibold mb-1">Before you take a practice exam</p>
            <p>Make sure you have completed the lesson content for all 4 domains first. Aim for 75%+ on domain quizzes before attempting a full exam.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
