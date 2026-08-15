'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Flame, BookOpen, Brain, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { CircularProgress, ProgressBar } from '@/components/ui/ProgressBar'
import { getReadinessScore, getStudyStreak, getAllLessonProgress, getAllQuizHistory } from '@/lib/progress'

const TOTAL_LESSONS = 63

const domains = [
  { num: 1, label: 'Security', color: '#2563EB' },
  { num: 2, label: 'Resilience', color: '#16A34A' },
  { num: 3, label: 'Performance', color: '#7C3AED' },
  { num: 4, label: 'Cost', color: '#D97706' },
]

export default function ProgressPage() {
  const [readiness, setReadiness] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [quizAvg, setQuizAvg] = useState<number | null>(null)
  const [domainScores, setDomainScores] = useState<Record<number, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReadiness(getReadinessScore(TOTAL_LESSONS))
    setStreak(getStudyStreak())
    const lessons = getAllLessonProgress()
    setLessonsCompleted(Object.values(lessons).filter(l => l.completed).length)

    const history = getAllQuizHistory()
    const allResults = Object.values(history).flat()
    if (allResults.length > 0) {
      const avg = allResults.reduce((acc, r) => acc + (r.score / r.total), 0) / allResults.length
      setQuizAvg(Math.round(avg * 100))
    }

    // Per-domain quiz scores
    const scores: Record<number, number> = {}
    for (const [key, results] of Object.entries(history)) {
      const match = key.match(/domain-(\d)/)
      if (match) {
        const domain = Number(match[1])
        const avg = results.reduce((acc, r) => acc + (r.score / r.total), 0) / results.length
        scores[domain] = Math.round(avg * 100)
      }
    }
    setDomainScores(scores)
  }, [])

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Your Progress</h1>
        <p className="text-slate-500">Track your readiness for the SAA-C03 exam.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-black text-aws-orange mb-1">{readiness}%</div>
          <p className="text-xs text-slate-500">Readiness Score</p>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center gap-1 text-3xl font-black text-orange-500 mb-1">
            <Flame size={24} className="text-orange-500" /> {streak}
          </div>
          <p className="text-xs text-slate-500">Day Streak</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-black text-blue-600 mb-1">{lessonsCompleted}</div>
          <p className="text-xs text-slate-500">Lessons Done</p>
          <p className="text-xs text-slate-400">of {TOTAL_LESSONS}</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-black text-green-600 mb-1">{quizAvg !== null ? `${quizAvg}%` : '—'}</div>
          <p className="text-xs text-slate-500">Quiz Average</p>
        </Card>
      </div>

      {/* Lesson progress bar */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">Lesson Completion</span>
          </div>
          <span className="text-sm text-slate-500">{lessonsCompleted}/{TOTAL_LESSONS}</span>
        </div>
        <ProgressBar value={lessonsCompleted} max={TOTAL_LESSONS} size="lg" showLabel />
      </Card>

      {/* Domain quiz performance */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Brain size={16} className="text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">Domain Quiz Scores</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {domains.map(d => (
            <CircularProgress
              key={d.num}
              value={domainScores[d.num] ?? 0}
              color={d.color}
              label={`Domain ${d.num}\n${d.label}`}
            />
          ))}
        </div>
      </Card>

      {/* Next recommended action */}
      <Card className="mb-6 border-aws-orange border-l-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-aws-orange" />
          <span className="font-semibold text-slate-900 dark:text-white">Recommended Next Step</span>
        </div>
        {lessonsCompleted === 0 ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">Start with the foundation module — no prior AWS experience needed.</p>
            <Link href="/learn/module-0-foundations" className="btn-primary text-sm shrink-0 ml-4">Begin <ArrowRight size={14} className="inline" /></Link>
          </div>
        ) : readiness < 40 ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">Keep studying — complete more lessons before taking practice exams.</p>
            <Link href="/learn" className="btn-primary text-sm shrink-0 ml-4">Continue <ArrowRight size={14} className="inline" /></Link>
          </div>
        ) : readiness < 70 ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">Good progress! Take a domain quiz to identify weak areas.</p>
            <Link href="/quiz" className="btn-primary text-sm shrink-0 ml-4">Quiz <ArrowRight size={14} className="inline" /></Link>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">Excellent! You're ready to take a full practice exam.</p>
            <Link href="/exam" className="btn-primary text-sm shrink-0 ml-4">Practice Exam <ArrowRight size={14} className="inline" /></Link>
          </div>
        )}
      </Card>

      {readiness === 0 && (
        <div className="text-center text-slate-400 py-8">
          <p className="text-5xl mb-3">📊</p>
          <p className="font-medium text-slate-600 dark:text-slate-400">No study data yet.</p>
          <p className="text-sm mt-1">Complete some lessons and quizzes to see your stats here.</p>
          <Link href="/learn" className="btn-primary mt-4 inline-block">Start Learning</Link>
        </div>
      )}
    </div>
  )
}
