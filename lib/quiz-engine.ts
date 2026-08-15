import type { Question, QuizAttempt, ExamResult } from '@/types'

// Scale raw score to 100-1000 range (AWS uses compensatory scaling)
export function scaleScore(rawPercent: number): number {
  // AWS score scale: 100 (min) to 1000 (max), pass at 720
  return Math.round(100 + rawPercent * 900)
}

export function isPassing(scaledScore: number): boolean {
  return scaledScore >= 720
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function selectExamQuestions(
  allQuestions: Question[],
  totalCount: number = 65
): Question[] {
  const weights: Record<number, number> = { 1: 0.30, 2: 0.26, 3: 0.24, 4: 0.20 }
  const byDomain: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [] }

  for (const q of allQuestions) {
    if (byDomain[q.domain]) byDomain[q.domain].push(q)
  }

  const selected: Question[] = []
  for (const [domain, weight] of Object.entries(weights)) {
    const count = Math.round(totalCount * weight)
    const pool = shuffleArray(byDomain[Number(domain)])
    selected.push(...pool.slice(0, count))
  }

  return shuffleArray(selected).slice(0, totalCount)
}

export function gradeAttempt(question: Question, selectedAnswers: string[]): boolean {
  const correct = [...question.correctAnswers].sort().join(',')
  const selected = [...selectedAnswers].sort().join(',')
  return correct === selected
}

export function computeDomainScores(
  questions: Question[],
  attempts: QuizAttempt[]
): Record<number, { score: number; total: number }> {
  const domainMap: Record<number, { score: number; total: number }> = {}
  const attemptMap = new Map(attempts.map(a => [a.questionId, a]))

  for (const q of questions) {
    if (!domainMap[q.domain]) domainMap[q.domain] = { score: 0, total: 0 }
    domainMap[q.domain].total++
    const attempt = attemptMap.get(q.id)
    if (attempt?.isCorrect) domainMap[q.domain].score++
  }
  return domainMap
}
