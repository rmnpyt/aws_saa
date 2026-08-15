'use client'

import { useState, useCallback } from 'react'
import type { Question, QuizAttempt, QuizResult } from '@/types'
import { shuffleArray, gradeAttempt } from '@/lib/quiz-engine'
import { saveQuizResult } from '@/lib/progress'
import { QuestionCard } from './QuestionCard'
import { AnswerFeedback } from './AnswerFeedback'
import { QuizResults } from './QuizResults'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface QuizSessionProps {
  questions: Question[]
  domainKey: string
  domainName: string
}

type Phase = 'answering' | 'feedback' | 'done'

export function QuizSession({ questions: rawQuestions, domainKey, domainName }: QuizSessionProps) {
  const [questions] = useState(() => shuffleArray(rawQuestions).slice(0, 15))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>('answering')
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [startTime] = useState(Date.now())

  const q = questions[current]

  const handleSelect = (id: string) => {
    if (phase !== 'answering') return
    if (q.type === 'multiple-choice') {
      setSelected([id])
    } else {
      setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }
  }

  const handleSubmit = () => {
    const isCorrect = gradeAttempt(q, selected)
    setAttempts(prev => [...prev, { questionId: q.id, selectedAnswers: selected, isCorrect, timeSpent: 0 }])
    setPhase('feedback')
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      const allAttempts = [...attempts]
      const score = allAttempts.filter(a => a.isCorrect).length
      const result: QuizResult = {
        domain: questions[0].domain,
        score,
        total: questions.length,
        attempts: allAttempts,
        completedAt: new Date().toISOString(),
        durationSeconds: Math.floor((Date.now() - startTime) / 1000),
      }
      saveQuizResult(domainKey, result)
      setPhase('done')
    } else {
      setCurrent(c => c + 1)
      setSelected([])
      setPhase('answering')
    }
  }

  if (phase === 'done') {
    const score = attempts.filter(a => a.isCorrect).length
    return <QuizResults score={score} total={questions.length} attempts={attempts} questions={questions} domainName={domainName} />
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-500">Question {current + 1} of {questions.length}</span>
          <span className="text-sm font-medium text-slate-500">{attempts.filter(a => a.isCorrect).length} correct</span>
        </div>
        <ProgressBar value={current} max={questions.length} />
      </div>

      {/* Question */}
      <QuestionCard
        question={q}
        selected={selected}
        onSelect={handleSelect}
        disabled={phase === 'feedback'}
      />

      {/* Feedback */}
      {phase === 'feedback' && (
        <AnswerFeedback
          question={q}
          selected={selected}
          isCorrect={gradeAttempt(q, selected)}
        />
      )}

      {/* Actions */}
      <div className="flex justify-end mt-4">
        {phase === 'answering' ? (
          <Button onClick={handleSubmit} disabled={selected.length === 0}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  )
}
