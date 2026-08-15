// ─── Content Types ────────────────────────────────────────────────────────────

export interface LessonMeta {
  title: string
  module: string
  moduleTitle: string
  slug: string
  order: number
  domain: 0 | 1 | 2 | 3 | 4
  taskStatements: string[]
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  services: string[]
  prerequisites?: string[]
}

export interface ModuleMeta {
  id: string
  slug: string
  title: string
  shortTitle: string
  domain: 0 | 1 | 2 | 3 | 4
  weight: number
  description: string
  color: string
  estimatedHours: number
  lessons: LessonMeta[]
}

// ─── Quiz / Question Types ────────────────────────────────────────────────────

export type QuestionType = 'multiple-choice' | 'multiple-response'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  domain: 0 | 1 | 2 | 3 | 4
  taskStatement: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: QuestionType
  question: string
  options: QuestionOption[]
  correctAnswers: string[]
  explanation: {
    correct: string
    perOption: Record<string, string>
  }
  tags: string[]
}

export interface QuizAttempt {
  questionId: string
  selectedAnswers: string[]
  isCorrect: boolean
  timeSpent: number
}

export interface QuizResult {
  domain: number
  score: number
  total: number
  attempts: QuizAttempt[]
  completedAt: string
  durationSeconds: number
}

export interface ExamResult {
  examId: string
  scaledScore: number
  passed: boolean
  domainScores: Record<number, { score: number; total: number }>
  attempts: QuizAttempt[]
  completedAt: string
  durationSeconds: number
}

// ─── Flashcard Types ──────────────────────────────────────────────────────────

export type RecallRating = 'again' | 'hard' | 'good' | 'easy'

export interface Flashcard {
  id: string
  domain: 0 | 1 | 2 | 3 | 4
  front: string
  back: string
  tags: string[]
  services?: string[]
}

export interface FlashcardState {
  interval: number
  ease: number
  repetitions: number
  nextReview: string
  lastRating?: RecallRating
}

// ─── Progress Types ───────────────────────────────────────────────────────────

export interface LessonProgress {
  completed: boolean
  completedAt?: string
  timeSpentMinutes?: number
}

export interface ProgressStore {
  lessons: Record<string, LessonProgress>
  quizzes: Record<string, QuizResult[]>
  exams: Record<string, ExamResult>
  flashcards: Record<string, Record<string, FlashcardState>>
  studyDays: string[]
  lastActive?: string
}
