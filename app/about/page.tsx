import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Brain, CreditCard, Layers, CheckCircle, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About',
  description: 'About this AWS SAA-C03 exam prep platform — what it covers, how to use it, and what to expect on the exam.',
}

const studyPlan = [
  { phase: 'Week 1–2', title: 'Foundations', tasks: ['Complete Module 0: AWS Foundations', 'Learn IAM, VPC, EC2, S3 basics', 'Do 30 foundation flashcards', 'Take domain 0 quiz'] },
  { phase: 'Week 3–4', title: 'Security (Domain 1)', tasks: ['Complete Module 1: Security', 'Focus on IAM roles, KMS, VPC security', 'Review security flashcards', 'Quiz: Domain 1'] },
  { phase: 'Week 5–6', title: 'Resilience (Domain 2)', tasks: ['Complete Module 2: Resilience', 'Study RDS, ASG, Route 53, SQS/SNS', 'Review resilience flashcards', 'Quiz: Domain 2'] },
  { phase: 'Week 7–8', title: 'Performance & Cost', tasks: ['Complete Modules 3 & 4', 'Study storage types, caching, pricing', 'Review remaining flashcards', 'Take Practice Exam 1'] },
  { phase: 'Week 9–10', title: 'Exam Prep', tasks: ['Review weak areas from Practice Exam 1', 'Take Practice Exams 2 & 3', 'Drill missed questions', 'Schedule real exam'] },
]

const domains = [
  { num: 1, title: 'Secure Architectures', weight: '30%', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', services: 'IAM, KMS, CloudTrail, GuardDuty, WAF, Security Groups, NACLs, VPC Endpoints' },
  { num: 2, title: 'Resilient Architectures', weight: '26%', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', services: 'RDS Multi-AZ, ASG, ELB, Route 53, SQS, SNS, Kinesis, Lambda, Step Functions' },
  { num: 3, title: 'High-Performing Architectures', weight: '24%', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', services: 'EBS, EFS, FSx, CloudFront, ElastiCache, DynamoDB, Athena, Redshift, Placement Groups' },
  { num: 4, title: 'Cost-Optimized Architectures', weight: '20%', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', services: 'EC2 Pricing Models, S3 Storage Classes, Savings Plans, Cost Explorer, Budgets, Trusted Advisor' },
]

const examFacts = [
  { label: 'Questions', value: '65' },
  { label: 'Duration', value: '130 min' },
  { label: 'Passing Score', value: '720 / 1000' },
  { label: 'Question Types', value: 'Multiple choice & Multiple response' },
  { label: 'Scaled Scoring', value: '100–1000 (not raw %)' },
  { label: 'Validity', value: '3 years' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">About This Platform</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          A complete, self-contained study tool for the AWS Certified Solutions Architect — Associate (SAA-C03) exam.
          Built for learners starting from scratch, aiming to pass in 8–10 weeks of part-time study.
        </p>
      </div>

      {/* What's Included */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: BookOpen, color: 'text-blue-500', title: '63 Lessons', desc: 'Six modules from AWS foundations to exam prep. Each lesson covers one focused topic with exam tips.', href: '/learn' },
            { icon: Brain, color: 'text-green-500', title: 'Practice Quizzes', desc: 'Domain-targeted 15-question quizzes with per-option explanations and a domain score breakdown.', href: '/quiz' },
            { icon: CreditCard, color: 'text-purple-500', title: '215+ Flashcards', desc: 'SM-2 spaced repetition — cards you struggle with appear more often. Covers all key services and concepts.', href: '/flashcards' },
            { icon: Layers, color: 'text-amber-500', title: '3 Full Practice Exams', desc: '65-question timed exams (130 min) with a scaled score (100–1000), question navigator, and domain breakdown.', href: '/exam' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <Card hover className="flex gap-4 h-full">
                <item.icon size={22} className={`${item.color} shrink-0 mt-0.5`} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam Overview */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">SAA-C03 Exam At a Glance</h2>
        <Card className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {examFacts.map(f => (
              <div key={f.label}>
                <div className="text-xs text-slate-500 mb-0.5">{f.label}</div>
                <div className="font-semibold text-slate-900 dark:text-white">{f.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          {domains.map(d => (
            <Card key={d.num} className="h-full">
              <div className="flex items-start gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.bg} ${d.color}`}>
                  {d.weight}
                </span>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Domain {d.num}</p>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{d.title}</h3>
                  <p className="text-xs text-slate-500">{d.services}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Study Plan */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Suggested Study Plan (8–10 Weeks)</h2>
        <p className="text-sm text-slate-500 mb-6">Designed for 5–7 hours/week. Adjust based on your pace.</p>
        <div className="space-y-3">
          {studyPlan.map((phase, i) => (
            <Card key={i} className="flex gap-4">
              <div className="shrink-0 text-center min-w-[80px]">
                <div className="text-xs text-slate-500">{phase.phase}</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{phase.title}</div>
              </div>
              <ul className="space-y-1">
                {phase.tasks.map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* How Scoring Works */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">How AWS Exam Scoring Works</h2>
        <Card>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            The SAA-C03 uses <strong className="text-slate-900 dark:text-white">scaled scoring</strong> — your raw percentage correct is mapped
            to a 100–1000 scale. The passing score is <strong className="text-slate-900 dark:text-white">720</strong>.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Roughly, you need to answer ~72% of questions correctly to pass, but the exact threshold varies because
            some questions are harder than others and are weighted differently.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">Multiple-response questions</strong> require selecting all correct answers.
            Partial credit is not given — you must get all correct options selected.
          </p>
        </Card>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Exam Tips</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Read every word — AWS questions often hinge on "most cost-effective," "highest availability," or "least operational overhead."',
            'Eliminate wrong answers first. Two options usually can be eliminated immediately.',
            'Know the difference between similar services: NAT Gateway vs Internet Gateway, ALB vs NLB vs GWLB, Standard-IA vs One Zone-IA.',
            'If a question says "no servers to manage" — think Lambda, Fargate, or managed services.',
            '"Loosely coupled" and "decouple" → think SQS, SNS, EventBridge.',
            'For DR: know Backup & Restore, Pilot Light, Warm Standby, Multi-Site and their RTO/RPO tradeoffs.',
          ].map((tip, i) => (
            <Card key={i} className="text-sm text-slate-600 dark:text-slate-400">
              <div className="flex gap-2">
                <span className="text-aws-orange font-bold shrink-0">{i + 1}.</span>
                {tip}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress Note */}
      <Card className="bg-slate-50 dark:bg-slate-800/50 mb-8">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Progress is Saved Locally</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your lesson completions, flashcard review history, and quiz scores are stored in your browser's
          localStorage. No account needed. Clearing your browser data will reset your progress.
        </p>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link href="/learn/module-0-foundations" className="inline-flex items-center gap-2 bg-aws-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
          Start Learning <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  )
}
