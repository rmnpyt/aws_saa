'use client'

import type { Flashcard } from '@/types'

interface FlashcardCardProps {
  card: Flashcard
  flipped: boolean
  onFlip: () => void
}

export function FlashcardCard({ card, flipped, onFlip }: FlashcardCardProps) {
  return (
    <div className="flashcard-container cursor-pointer h-64" onClick={onFlip}>
      <div className={`flashcard-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-front rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-6 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Question</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {card.front}
          </p>
          <p className="text-xs text-slate-400 mt-6">Click to reveal answer</p>
        </div>

        {/* Back */}
        <div className="flashcard-back rounded-2xl border-2 border-aws-orange bg-orange-50 dark:bg-orange-900/20 shadow-lg p-6 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold text-aws-orange uppercase tracking-wide mb-4">Answer</p>
          <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed text-left w-full whitespace-pre-wrap">
            {card.back}
          </div>
          {card.services && card.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
              {card.services.map(s => (
                <span key={s} className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
