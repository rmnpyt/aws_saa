import { Target } from 'lucide-react'

export function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-4">
      <div className="flex gap-3">
        <Target size={18} className="text-aws-orange shrink-0 mt-0.5" />
        <div className="text-sm text-orange-900 dark:text-orange-200">
          <p className="font-semibold text-aws-orange mb-1">Exam Tip</p>
          {children}
        </div>
      </div>
    </div>
  )
}

export function KeyConcept({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">Key Concept</p>
      <p className="font-semibold text-slate-900 dark:text-white mb-1">{title}</p>
      <div className="text-sm text-slate-700 dark:text-slate-300">{children}</div>
    </div>
  )
}

export function ServiceCard({ name, description, useCases }: { name: string; description: string; useCases: string[] }) {
  return (
    <div className="my-4 rounded-lg border bg-white dark:bg-slate-800 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
          AWS Service
        </span>
        <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{description}</p>
      {useCases.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">When to use:</p>
          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-0.5">
            {useCases.map((uc, i) => <li key={i} className="flex gap-2"><span className="text-aws-orange">→</span>{uc}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export function Diagram({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="rounded-lg border bg-white dark:bg-slate-800 p-4 flex justify-center">
        <img src={src} alt={alt} className="max-w-full h-auto" />
      </div>
      {caption && <figcaption className="text-center text-sm text-slate-500 mt-2">{caption}</figcaption>}
    </figure>
  )
}

export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
