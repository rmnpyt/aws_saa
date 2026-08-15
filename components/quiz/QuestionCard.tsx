'use client'

import { clsx } from 'clsx'
import type { Question } from '@/types'
import { CheckSquare, Square, Circle, CheckCircle2 } from 'lucide-react'

interface QuestionCardProps {
  question: Question
  selected: string[]
  onSelect: (id: string) => void
  disabled?: boolean
  showCorrect?: boolean
}

export function QuestionCard({ question, selected, onSelect, disabled, showCorrect }: QuestionCardProps) {
  const isMultiResponse = question.type === 'multiple-response'

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-800 p-6 shadow-sm">
      {isMultiResponse && (
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
          Select all that apply
        </p>
      )}
      <p className="text-base font-medium text-slate-900 dark:text-white mb-5 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map(opt => {
          const isSelected = selected.includes(opt.id)
          const isCorrect = question.correctAnswers.includes(opt.id)
          const IconSelected = isMultiResponse ? CheckSquare : CheckCircle2
          const IconEmpty = isMultiResponse ? Square : Circle

          let optionClass = 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          if (showCorrect && isCorrect) optionClass = 'border-green-400 bg-green-50 dark:bg-green-900/20'
          else if (showCorrect && isSelected && !isCorrect) optionClass = 'border-red-400 bg-red-50 dark:bg-red-900/20'
          else if (isSelected) optionClass = 'border-aws-orange bg-orange-50 dark:bg-orange-900/20'

          return (
            <button
              key={opt.id}
              onClick={() => !disabled && onSelect(opt.id)}
              disabled={disabled}
              className={clsx(
                'w-full flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all',
                optionClass,
                disabled && 'cursor-default'
              )}
            >
              <span className={clsx('shrink-0 mt-0.5', isSelected ? 'text-aws-orange' : 'text-slate-400')}>
                {isSelected ? <IconSelected size={16} /> : <IconEmpty size={16} />}
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold mr-1.5">{opt.id}.</span>
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
