'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { markLessonComplete, getLessonProgress } from '@/lib/progress'

export function MarkComplete({ lessonKey }: { lessonKey: string }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDone(getLessonProgress(lessonKey).completed)
  }, [lessonKey])

  function handle() {
    if (!done) {
      markLessonComplete(lessonKey)
      setDone(true)
    }
  }

  return (
    <button
      onClick={handle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
        done
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700'
      }`}
    >
      {done ? <CheckCircle size={16} /> : <Circle size={16} />}
      {done ? 'Completed' : 'Mark as complete'}
    </button>
  )
}
