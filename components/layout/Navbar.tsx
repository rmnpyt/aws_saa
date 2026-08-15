'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Brain, CreditCard, BarChart3, Layers, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'

const links = [
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/quiz', label: 'Quiz', icon: Brain },
  { href: '/flashcards', label: 'Flashcards', icon: CreditCard },
  { href: '/exam', label: 'Practice Exam', icon: Layers },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">☁️</span>
            <span className="text-slate-900 dark:text-white">AWS SAA</span>
            <span className="text-aws-orange">Study</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(href)
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-aws-orange'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium',
                  pathname.startsWith(href)
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-aws-orange'
                    : 'text-slate-600 dark:text-slate-300'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
