import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <p>AWS SAA Study — SAA-C03 Exam Preparation</p>
          <p className="mt-0.5">Not affiliated with Amazon Web Services. All content is original and for educational purposes.</p>
        </div>
        <div className="flex gap-4 text-sm text-slate-500">
          <Link href="/about" className="hover:text-aws-orange transition-colors">About</Link>
          <Link href="/services" className="hover:text-aws-orange transition-colors">Services A–Z</Link>
        </div>
      </div>
    </footer>
  )
}
