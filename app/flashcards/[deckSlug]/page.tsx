import { notFound } from 'next/navigation'
import { getFlashcards } from '@/lib/content'
import { FlashcardSession } from '@/components/flashcard/FlashcardSession'

const deckNames: Record<string, string> = {
  'domain-1-security': 'Domain 1 – Security',
  'domain-2-resilience': 'Domain 2 – Resilience',
  'domain-3-performance': 'Domain 3 – Performance',
  'domain-4-cost': 'Domain 4 – Cost',
  'services-az': 'AWS Services A–Z',
}

export default function FlashcardDeckPage({ params }: { params: { deckSlug: string } }) {
  const deckName = deckNames[params.deckSlug]
  if (!deckName) notFound()
  const cards = getFlashcards(params.deckSlug)

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{deckName}</h1>
      <p className="text-slate-500 mb-8">{cards.length} total cards · Due cards shown first</p>
      <FlashcardSession cards={cards} deckKey={params.deckSlug} deckName={deckName} />
    </div>
  )
}
