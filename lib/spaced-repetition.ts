import type { RecallRating, FlashcardState } from '@/types'

// SM-2 Algorithm implementation
export function applyRating(state: FlashcardState, rating: RecallRating): FlashcardState {
  const q = ratingToQ(rating)
  const newEase = Math.max(1.3, state.ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newInterval: number
  let newReps: number

  if (q < 3) {
    newInterval = 1
    newReps = 0
  } else {
    newReps = state.repetitions + 1
    if (state.repetitions === 0) newInterval = 1
    else if (state.repetitions === 1) newInterval = 6
    else newInterval = Math.round(state.interval * newEase)
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInterval)

  return {
    interval: newInterval,
    ease: newEase,
    repetitions: newReps,
    nextReview: nextReview.toISOString().split('T')[0],
    lastRating: rating,
  }
}

function ratingToQ(rating: RecallRating): number {
  switch (rating) {
    case 'again': return 1
    case 'hard':  return 2
    case 'good':  return 4
    case 'easy':  return 5
  }
}
