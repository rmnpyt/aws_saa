import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AWS SAA Study — SAA-C03 Exam Prep',
    template: '%s | AWS SAA Study',
  },
  description: 'Interactive study platform for the AWS Certified Solutions Architect Associate (SAA-C03) exam. Lessons, quizzes, flashcards, and practice exams.',
  keywords: ['AWS', 'SAA-C03', 'Solutions Architect', 'certification', 'exam prep'],
  openGraph: {
    title: 'AWS SAA Study',
    description: 'Interactive SAA-C03 exam prep — lessons, quizzes, flashcards & practice exams.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
