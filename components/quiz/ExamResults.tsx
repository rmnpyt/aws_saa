'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import type { ExamResult, Question } from '@/types'
import { Button } from '@/components/ui/Button'
import { QuestionCard } from './QuestionCard'

const domainNames: Record<number, string> = {
  1: 'Design Secure Architectures',
  2: 'Design Resilient Architectures',
  3: 'Design High-Performing Architectures',
  4: 'Design Cost-Optimized Architectures',
}

export function ExamResults({ result, questions }: { result: ExamResult; questions: Question[] }) {
  const [showReview, setShowReview] = useState(false)
  const attemptMap = new Map(result.attempts.map(a => [a.questionId, a]))

  return (
    <div className="max-w-3xl mx-auto">
      {/* Score card */}
      <div className={`rounded-2xl border p-8 text-center mb-6 ${
        result.passed
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
      }`}>
        <div className={`text-6xl font-black mb-2 ${result.passed ? 'text-green-600' : 'text-red-500'}`}>
          {result.scaledScore}
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-1">Scaled Score (pass: 720)</p>
        <div className={`inline-flex items-center gap-2 text-xl font-bold mt-2 ${result.passed ? 'text-green-700' : 'text-red-600'}`}>
          {result.passed ? <CheckCircle size={24} /> : <XCircle size={24} />}
          {result.passed ? 'PASS' : 'NOT PASSED'}
        </div>
      </div>

      {/* Domain breakdown */}
      <div className="rounded-xl border bg-white dark:bg-slate-800 p-6 mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Domain Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(result.domainScores).map(([domain, ds]) => {
            const pct = Math.round((ds.score / ds.total) * 100)
            const colors = ['', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500']
            return (
              <div key={domain}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">{domainNames[Number(domain)]}</span>
                  <span className="font-semibold">{ds.score}/{ds.total} ({pct}%)</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${colors[Number(domain)]}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3 justify-center mb-8">
        <Button variant="secondary" onClick={() => setShowReview(!showReview)}>
          {showReview ? 'Hide' : 'Review'} All Questions
        </Button>
        <Link href="/exam"><Button variant="ghost">Back to Exams</Button></Link>
      </div>

      {showReview && (
        <div className="space-y-6">
          {questions.map(q => {
            const attempt = attemptMap.get(q.id)!
            return (
              <div key={q.id}>
                <QuestionCard question={q} selected={attempt.selectedAnswers} onSelect={() => {}} disabled showCorrect />
                <div className={`mt-2 p-3 rounded-lg text-sm ${attempt.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <p className="font-semibold mb-1">{attempt.isCorrect ? '✓ Correct' : `✗ Correct: ${q.correctAnswers.join(', ')}`}</p>
                  <p className="text-slate-600 dark:text-slate-400">{q.explanation.correct}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
