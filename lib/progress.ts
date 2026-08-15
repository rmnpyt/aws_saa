'use client'

import type { ProgressStore, LessonProgress, QuizResult, ExamResult, FlashcardState, RecallRating } from '@/types'

const STORAGE_KEY = 'aws-saa-progress'

function getStore(): ProgressStore {
  if (typeof window === 'undefined') return emptyStore()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    return JSON.parse(raw) as ProgressStore
  } catch {
    return emptyStore()
  }
}

function emptyStore(): ProgressStore {
  return { lessons: {}, quizzes: {}, exams: {}, flashcards: {}, studyDays: [] }
}

function save(store: ProgressStore) {
  if (typeof window === 'undefined') return
  const today = new Date().toISOString().split('T')[0]
  if (!store.studyDays.includes(today)) store.studyDays.push(today)
  store.lastActive = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

export function markLessonComplete(lessonKey: string) {
  const store = getStore()
  store.lessons[lessonKey] = {
    completed: true,
    completedAt: new Date().toISOString(),
  }
  save(store)
}

export function getLessonProgress(lessonKey: string): LessonProgress {
  return getStore().lessons[lessonKey] ?? { completed: false }
}

export function getAllLessonProgress(): Record<string, LessonProgress> {
  return getStore().lessons
}

// ─── Quizzes ─────────────────────────────────────────────────────────────────

export function saveQuizResult(domainKey: string, result: QuizResult) {
  const store = getStore()
  if (!store.quizzes[domainKey]) store.quizzes[domainKey] = []
  store.quizzes[domainKey].push(result)
  if (store.quizzes[domainKey].length > 20) store.quizzes[domainKey].shift()
  save(store)
}

export function getQuizHistory(domainKey: string): QuizResult[] {
  return getStore().quizzes[domainKey] ?? []
}

export function getAllQuizHistory(): Record<string, QuizResult[]> {
  return getStore().quizzes
}

// ─── Exams ────────────────────────────────────────────────────────────────────

export function saveExamResult(result: ExamResult) {
  const store = getStore()
  store.exams[result.examId] = result
  save(store)
}

export function getExamResult(examId: string): ExamResult | null {
  return getStore().exams[examId] ?? null
}

export function getAllExamResults(): Record<string, ExamResult> {
  return getStore().exams
}

// ─── Flashcards ───────────────────────────────────────────────────────────────

export function getFlashcardState(deckKey: string, cardId: string): FlashcardState {
  return getStore().flashcards[deckKey]?.[cardId] ?? {
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    nextReview: new Date().toISOString().split('T')[0],
  }
}

export function saveFlashcardState(deckKey: string, cardId: string, state: FlashcardState) {
  const store = getStore()
  if (!store.flashcards[deckKey]) store.flashcards[deckKey] = {}
  store.flashcards[deckKey][cardId] = state
  save(store)
}

export function getDueFlashcards(deckKey: string, cardIds: string[]): string[] {
  const store = getStore()
  const today = new Date().toISOString().split('T')[0]
  return cardIds.filter(id => {
    const state = store.flashcards[deckKey]?.[id]
    if (!state) return true
    return state.nextReview <= today
  })
}

// ─── Aggregate Stats ──────────────────────────────────────────────────────────

export function getReadinessScore(totalLessons: number): number {
  const store = getStore()
  const completed = Object.values(store.lessons).filter(l => l.completed).length
  const lessonScore = totalLessons > 0 ? (completed / totalLessons) * 40 : 0

  const quizScores = Object.values(store.quizzes).flat()
  const avgQuiz = quizScores.length > 0
    ? quizScores.reduce((acc, q) => acc + (q.score / q.total), 0) / quizScores.length
    : 0
  const quizScore = avgQuiz * 40

  const examResults = Object.values(store.exams)
  const avgExam = examResults.length > 0
    ? examResults.reduce((acc, e) => acc + (e.scaledScore / 1000), 0) / examResults.length
    : 0
  const examScore = avgExam * 20

  return Math.round(lessonScore + quizScore + examScore)
}

export function getDomainLessonCompletion(
  lessonsByDomain: Record<number, string[]>
): Record<number, number> {
  const store = getStore()
  const result: Record<number, number> = {}
  for (const [domain, keys] of Object.entries(lessonsByDomain)) {
    const completed = keys.filter(k => store.lessons[k]?.completed).length
    result[Number(domain)] = keys.length > 0 ? Math.round((completed / keys.length) * 100) : 0
  }
  return result
}

export function getStudyStreak(): number {
  const store = getStore()
  if (store.studyDays.length === 0) return 0
  const sorted = [...store.studyDays].sort().reverse()
  let streak = 0
  let current = new Date()
  for (const day of sorted) {
    const diff = Math.floor((current.getTime() - new Date(day).getTime()) / 86400000)
    if (diff <= 1) { streak++; current = new Date(day) }
    else break
  }
  return streak
}
