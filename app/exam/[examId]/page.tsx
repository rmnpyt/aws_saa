import { notFound } from 'next/navigation'
import { getQuestions, getAllQuestions } from '@/lib/content'
import { selectExamQuestions, shuffleArray } from '@/lib/quiz-engine'
import { ExamSession } from '@/components/quiz/ExamSession'

const examTitles: Record<string, string> = {
  'practice-exam-1': 'Practice Exam 1',
  'practice-exam-2': 'Practice Exam 2',
  'practice-exam-3': 'Practice Exam 3',
}

export default function ExamSessionPage({ params }: { params: { examId: string } }) {
  if (!examTitles[params.examId]) notFound()

  // Try loading a dedicated exam file, fall back to pulling from domain banks
  let questions = getQuestions(params.examId)
  if (questions.length < 65) {
    const all = getAllQuestions()
    questions = selectExamQuestions(all, 65)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{examTitles[params.examId]}</h1>
        <p className="text-slate-500 mt-1">65 questions · 130 minutes · No answer feedback until submission · Pass: 720/1000</p>
      </div>
      <ExamSession questions={questions} examId={params.examId} />
    </div>
  )
}
