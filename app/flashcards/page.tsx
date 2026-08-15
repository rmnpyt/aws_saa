import Link from 'next/link'
import { CreditCard, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const decks = [
  { slug: 'domain-1-security', domain: 1, title: 'Domain 1 – Security', description: 'IAM, VPC, encryption, GuardDuty, Shield, WAF, and more.', count: 55, color: 'bg-blue-500' },
  { slug: 'domain-2-resilience', domain: 2, title: 'Domain 2 – Resilience', description: 'ELB, Auto Scaling, SQS/SNS, DR strategies, Route 53.', count: 50, color: 'bg-green-500' },
  { slug: 'domain-3-performance', domain: 3, title: 'Domain 3 – Performance', description: 'EC2 families, EBS types, Aurora, DynamoDB, CloudFront.', count: 45, color: 'bg-purple-500' },
  { slug: 'domain-4-cost', domain: 4, title: 'Domain 4 – Cost', description: 'Purchasing options, S3 tiers, cost management tools.', count: 35, color: 'bg-amber-500' },
  { slug: 'services-az', domain: 0, title: 'AWS Services A–Z', description: 'Quick-fire cards for every in-scope AWS service.', count: 80, color: 'bg-slate-500' },
]

export const metadata = { title: 'Flashcards' }

export default function FlashcardsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Flashcard Decks</h1>
        <p className="text-slate-500">Spaced-repetition flashcards — only shows cards due today. Ratings adjust review intervals automatically.</p>
      </div>

      <div className="space-y-4">
        {decks.map(deck => (
          <Link key={deck.slug} href={`/flashcards/${deck.slug}`}>
            <Card hover className="flex items-center gap-4">
              <div className={`${deck.color} text-white rounded-xl p-3 shrink-0`}>
                <CreditCard size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{deck.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{deck.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-sm text-slate-400">
                {deck.count} cards
                <ArrowRight size={14} />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-sm text-purple-800 dark:text-purple-300">
        <strong>How spaced repetition works:</strong> Rate each card After → Hard → Good → Easy. Cards you find easy appear less often; cards you find hard come back sooner. Aim for a daily 10–15 minute session.
      </div>
    </div>
  )
}
