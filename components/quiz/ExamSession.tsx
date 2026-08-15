'use client'

import { useState, useCallback } from 'react'
import { Flag, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Question, QuizAttempt, ExamResult } from '@/types'
import { gradeAttempt, computeDomainScores, scaleScore } from '@/lib/quiz-engine'
import { saveExamResult } from '@/lib/progress'
import { QuestionCard } from './QuestionCard'
import { Button } from '@/components/ui/Button'
import { Timer } from '@/components/ui/Timer'
import { ExamResults } from './ExamResults'

interface ExamSessionProps {
  questions: Question[]
  examId: string
}

export function ExamSession({ questions, examId }: ExamSessionProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<ExamResult | null>(null)
  const [startTime] = useState(Date.now())

  const q = questions[current]

  const handleSelect = (id: string) => {
    setAnswers(prev => {
      const cur = prev[q.id] ?? []
      if (q.type === 'multiple-choice') return { ...prev, [q.id]: [id] }
      return { ...prev, [q.id]: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] }
    })
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const n = new Set(prev)
      if (n.has(q.id)) n.delete(q.id); else n.add(q.id)
      return n
    })
  }

  const handleSubmit = useCallback(() => {
    const attempts: QuizAttempt[] = questions.map(q => ({
      questionId: q.id,
      selectedAnswers: answers[q.id] ?? [],
      isCorrect: gradeAttempt(q, answers[q.id] ?? []),
      timeSpent: 0,
    }))
    const domainScores = computeDomainScores(questions, attempts)
    const correct = attempts.filter(a => a.isCorrect).length
    const scaledScore = scaleScore(correct / questions.length)
    const examResult: ExamResult = {
      examId,
      scaledScore,
      passed: scaledScore >= 720,
      domainScores,
      attempts,
      completedAt: new Date().toISOString(),
      durationSeconds: Math.floor((Date.now() - startTime) / 1000),
    }
    saveExamResult(examResult)
    setResult(examResult)
    setSubmitted(true)
  }, [answers, questions, examId, startTime])

  if (submitted && result) return <ExamResults result={result} questions={questions} />

  const answered = Object.keys(answers).length
  const isFlagged = flagged.has(q.id)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Exam header */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-xl border bg-white dark:bg-slate-800">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Q {current + 1}/{questions.length} · Answered: {answered}/{questions.length}
        </div>
        <Timer durationSeconds={130 * 60} onExpire={handleSubmit} />
        <Button size="sm" variant="danger" onClick={handleSubmit}>
          Submit Exam
        </Button>
      </div>

      <QuestionCard question={q} selected={answers[q.id] ?? []} onSelect={handleSelect} />

      {/* Nav bar */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="secondary" size="sm" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
          <ChevronLeft size={15} /> Prev
        </Button>
        <button
          onClick={toggleFlag}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${isFlagged ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <Flag size={13} /> {isFlagged ? 'Flagged' : 'Flag'}
        </button>
        <Button variant="secondary" size="sm" onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1}>
          Next <ChevronRight size={15} />
        </Button>
      </div>

      {/* Question grid */}
      <div className="mt-6 p-4 rounded-xl border bg-white dark:bg-slate-800">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Question Navigator</p>
        <div className="grid grid-cols-13 gap-1">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                i === current ? 'bg-aws-orange text-white' :
                flagged.has(q.id) ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700' :
                answers[q.id]?.length ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
                'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /> Answered</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30" /> Flagged</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800" /> Not answered</span>
        </div>
      </div>
    </div>
  )
}
