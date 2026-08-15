import Link from 'next/link'
import { BookOpen, Brain, CreditCard, Layers, BarChart3, ArrowRight, Shield, Zap, DollarSign, Activity } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const domains = [
  { num: 1, title: 'Secure Architectures', weight: '30%', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', href: '/learn/module-1-security' },
  { num: 2, title: 'Resilient Architectures', weight: '26%', icon: Activity, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', href: '/learn/module-2-resilience' },
  { num: 3, title: 'High-Performing Architectures', weight: '24%', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', href: '/learn/module-3-performance' },
  { num: 4, title: 'Cost-Optimized Architectures', weight: '20%', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', href: '/learn/module-4-cost' },
]

const features = [
  { icon: BookOpen, title: 'Structured Lessons', description: '63 lessons with diagrams and exam tips, organized from foundations to advanced topics.', href: '/learn', color: 'text-blue-500' },
  { icon: Brain, title: 'Practice Quizzes', description: 'Domain-targeted quizzes with detailed explanations for every answer choice.', href: '/quiz', color: 'text-green-500' },
  { icon: CreditCard, title: 'Flashcards', description: 'Spaced-repetition flashcards to lock in service names, concepts, and differences.', href: '/flashcards', color: 'text-purple-500' },
  { icon: Layers, title: 'Practice Exams', description: '65-question timed mock exams with score estimation and domain breakdown.', href: '/exam', color: 'text-amber-500' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-aws-orange/20 text-aws-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            ☁️ SAA-C03 Exam Prep
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Pass the AWS Solutions Architect Associate
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            A complete, free, interactive study platform — from cloud fundamentals to exam-day readiness.
            No login required. 100% browser-based progress tracking.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/learn" className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3 rounded-xl">
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link href="/exam" className="inline-flex items-center gap-2 text-base px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
              Take Practice Exam
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-6">
            Passing score: 720/1000 · 65 questions · 130 minutes · 4 exam domains
          </p>
        </div>
      </section>

      {/* Domains */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Exam Domains</h2>
        <p className="text-slate-500 text-center mb-8">Everything on the exam, organized by the 4 official domains</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map(d => (
            <Link key={d.num} href={d.href}>
              <Card hover className="h-full">
                <div className={`w-10 h-10 rounded-xl ${d.bg} flex items-center justify-center mb-3`}>
                  <d.icon size={20} className={d.color} />
                </div>
                <p className="text-xs text-slate-500 mb-1">Domain {d.num} · {d.weight}</p>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{d.title}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Everything You Need to Pass</h2>
          <p className="text-slate-500 text-center mb-10">Four tools built to cover how you actually learn</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href}>
                <Card hover className="flex gap-4 h-full">
                  <div className="shrink-0">
                    <f.icon size={24} className={f.color} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500">{f.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '63', label: 'Lessons' },
            { value: '350+', label: 'Practice Questions' },
            { value: '215+', label: 'Flashcards' },
            { value: '3', label: 'Full Mock Exams' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-aws-orange mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-aws-orange py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to start?</h2>
        <p className="text-orange-100 mb-6">Begin with the foundation module — no prior AWS experience needed.</p>
        <Link href="/learn/module-0-foundations" className="inline-flex items-center gap-2 bg-white text-aws-orange font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
          Start from the Beginning <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
