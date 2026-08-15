import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { LessonMeta, ModuleMeta } from '@/types'

const contentDir = path.join(process.cwd(), 'content')
const dataDir = path.join(process.cwd(), 'data')

export function getModuleMetas(): ModuleMeta[] {
  const dirs = fs.readdirSync(contentDir).filter(d =>
    fs.statSync(path.join(contentDir, d)).isDirectory()
  )
  return dirs.map(dir => {
    const metaPath = path.join(contentDir, dir, '_meta.json')
    if (!fs.existsSync(metaPath)) return null
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as Omit<ModuleMeta, 'lessons'>
    const lessons = getLessonsForModule(dir)
    return { ...meta, lessons }
  }).filter(Boolean) as ModuleMeta[]
}

export function getLessonsForModule(moduleSlug: string): LessonMeta[] {
  const moduleDir = path.join(contentDir, moduleSlug)
  if (!fs.existsSync(moduleDir)) return []
  const files = fs.readdirSync(moduleDir)
    .filter(f => f.endsWith('.mdx') && !f.startsWith('_'))
    .sort()

  return files.map(file => {
    const raw = fs.readFileSync(path.join(moduleDir, file), 'utf-8')
    const { data } = matter(raw)
    return data as LessonMeta
  })
}

export function getLessonContent(moduleSlug: string, lessonSlug: string): {
  meta: LessonMeta
  content: string
} | null {
  const moduleDir = path.join(contentDir, moduleSlug)
  if (!fs.existsSync(moduleDir)) return null

  const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.mdx'))
  const file = files.find(f => {
    const raw = fs.readFileSync(path.join(moduleDir, f), 'utf-8')
    const { data } = matter(raw)
    return data.slug === lessonSlug
  })

  if (!file) return null
  const raw = fs.readFileSync(path.join(moduleDir, file), 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as LessonMeta, content }
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string): {
  prev: LessonMeta | null
  next: LessonMeta | null
} {
  const lessons = getLessonsForModule(moduleSlug)
  const idx = lessons.findIndex(l => l.slug === lessonSlug)
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  }
}

export function getQuestions(filename: string) {
  const p = path.join(dataDir, 'questions', `${filename}.json`)
  if (!fs.existsSync(p)) return []
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

export function getFlashcards(filename: string) {
  const p = path.join(dataDir, 'flashcards', `${filename}.json`)
  if (!fs.existsSync(p)) return []
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

export function getAllQuestions() {
  const files = fs.readdirSync(path.join(dataDir, 'questions'))
    .filter(f => f.endsWith('.json') && !f.startsWith('practice-exam'))
  return files.flatMap(f => {
    const p = path.join(dataDir, 'questions', f)
    return JSON.parse(fs.readFileSync(p, 'utf-8'))
  })
}
