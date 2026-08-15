'use client'

import { useState, useMemo } from 'react'
import type { Flashcard, RecallRating, FlashcardState } from '@/types'
import { applyRating } from '@/lib/spaced-repetition'
import { getFlashcardState, saveFlashcardState, getDueFlashcards } from '@/lib/progress'
import { FlashcardCard } from './FlashcardCard'
import { RecallRatingButtons } from './RecallRating'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { CheckCircle } from 'lucide-react'

interface FlashcardSessionProps {
  cards: Flashcard[]
  deckKey: string
  deckName: string
}

export function FlashcardSession({ cards, deckKey, deckName }: FlashcardSessionProps) {
  const dueIds = useMemo(() => getDueFlashcards(deckKey, cards.map(c => c.id)), [deckKey, cards])
  const dueCards = useMemo(() => cards.filter(c => dueIds.includes(c.id)), [cards, dueIds])

  const [queue, setQueue] = useState(dueCards)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  if (queue.length === 0 || current >= queue.length) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">All caught up!</h2>
        <p className="text-slate-500 mb-6">
          {reviewed > 0
            ? `You reviewed ${reviewed} card${reviewed > 1 ? 's' : ''}. Great work!`
            : `No cards are due right now. Come back tomorrow!`}
        </p>
        <p className="text-sm text-slate-400 mb-6">{dueCards.length === 0 ? `${cards.length} total cards in this deck` : ''}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Start Over
        </Button>
      </div>
    )
  }

  const card = queue[current]

  function handleRating(rating: RecallRating) {
    const state = getFlashcardState(deckKey, card.id)
    const newState = applyRating(state, rating)
    saveFlashcardState(deckKey, card.id, newState)
    setReviewed(r => r + 1)
    setCurrent(c => c + 1)
    setFlipped(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-500">{deckName}</div>
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {current + 1} / {queue.length} due
        </div>
      </div>
      <ProgressBar value={current} max={queue.length} className="mb-6" />

      <FlashcardCard card={card} flipped={flipped} onFlip={() => setFlipped(f => !f)} />

      {flipped ? (
        <div className="mt-6">
          <p className="text-center text-sm text-slate-500 mb-3">How well did you remember?</p>
          <RecallRatingButtons onRate={handleRating} />
        </div>
      ) : (
        <div className="mt-6 text-center">
          <Button onClick={() => setFlipped(true)}>Reveal Answer</Button>
        </div>
      )}
    </div>
  )
}
