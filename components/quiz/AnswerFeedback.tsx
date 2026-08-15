import { CheckCircle, XCircle } from 'lucide-react'
import type { Question } from '@/types'

interface AnswerFeedbackProps {
  question: Question
  selected: string[]
  isCorrect: boolean
}

export function AnswerFeedback({ question, selected, isCorrect }: AnswerFeedbackProps) {
  return (
    <div className={`mt-4 rounded-xl border p-5 ${
      isCorrect
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        {isCorrect
          ? <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
          : <XCircle size={18} className="text-red-600 dark:text-red-400" />}
        <span className={`font-semibold ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
          {isCorrect ? 'Correct!' : `Incorrect — correct answer: ${question.correctAnswers.join(', ')}`}
        </span>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        {question.explanation.correct}
      </p>
      <div className="space-y-2">
        {question.options.map(opt => {
          const exp = question.explanation.perOption?.[opt.id]
          if (!exp) return null
          const isCorrectOpt = question.correctAnswers.includes(opt.id)
          return (
            <div key={opt.id} className="text-xs text-slate-600 dark:text-slate-400 flex gap-2">
              <span className={`font-bold shrink-0 ${isCorrectOpt ? 'text-green-600 dark:text-green-400' : ''}`}>{opt.id}:</span>
              <span>{exp}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
