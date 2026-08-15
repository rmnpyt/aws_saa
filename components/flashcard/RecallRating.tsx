import type { RecallRating } from '@/types'

interface RecallRatingButtonsProps {
  onRate: (rating: RecallRating) => void
}

const ratings: { value: RecallRating; label: string; hint: string; color: string }[] = [
  { value: 'again', label: 'Again', hint: 'Completely forgot', color: 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' },
  { value: 'hard', label: 'Hard', hint: 'Remembered with effort', color: 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  { value: 'good', label: 'Good', hint: 'Remembered correctly', color: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  { value: 'easy', label: 'Easy', hint: 'Instantly recalled', color: 'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' },
]

export function RecallRatingButtons({ onRate }: RecallRatingButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {ratings.map(r => (
        <button
          key={r.value}
          onClick={() => onRate(r.value)}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl border font-medium transition-colors ${r.color}`}
        >
          <span className="text-sm font-bold">{r.label}</span>
          <span className="text-xs opacity-75">{r.hint}</span>
        </button>
      ))}
    </div>
  )
}
