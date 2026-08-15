'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import type { Question, QuizAttempt } from '@/types'
import { Button } from '@/components/ui/Button'
import { QuestionCard } from './QuestionCard'

interface QuizResultsProps {
  score: number
  total: number
  attempts: QuizAttempt[]
  questions: Question[]
  domainName: string
}

export function QuizResults({ score, total, attempts, questions, domainName }: QuizResultsProps) {
  const [showReview, setShowReview] = useState(false)
  const pct = Math.round((score / total) * 100)
  const passed = pct >= 70
  const attemptMap = new Map(attempts.map(a => [a.questionId, a]))
  const wrongQuestions = questions.filter(q => !attemptMap.get(q.id)?.isCorrect)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl border bg-white dark:bg-slate-800 p-8 text-center shadow-sm mb-6">
        <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-500'}`}>
          {pct}%
        </div>
        <p className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
          {score} / {total} correct
        </p>
        <p className="text-slate-500 mb-6">{domainName} Quiz</p>
        <p className={`font-semibold ${passed ? 'text-green-600' : 'text-amber-600'}`}>
          {passed ? '✓ Great job! Keep up the momentum.' : '→ Review the explanations and try again.'}
        </p>
      </div>

      <div className="flex gap-3 justify-center mb-8">
        <Button variant="secondary" onClick={() => window.location.reload()}>
          <RotateCcw size={15} /> Retake Quiz
        </Button>
        <Button variant="secondary" onClick={() => setShowReview(!showReview)}>
          {showReview ? 'Hide' : 'Review'} Wrong Answers ({wrongQuestions.length})
        </Button>
        <Link href="/quiz">
          <Button variant="ghost">All Quizzes</Button>
        </Link>
      </div>

      {showReview && wrongQuestions.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">Questions to Review</h3>
          {wrongQuestions.map(q => {
            const attempt = attemptMap.get(q.id)!
            return (
              <div key={q.id}>
                <QuestionCard question={q} selected={attempt.selectedAnswers} onSelect={() => {}} disabled showCorrect />
                <div className="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-green-600 mb-1">Correct answer: {q.correctAnswers.join(', ')}</p>
                  <p>{q.explanation.correct}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
