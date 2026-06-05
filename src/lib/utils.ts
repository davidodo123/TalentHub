import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string) {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: es })
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '')
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}

export function getJobTypeColor(slug: string): string {
  const colors: Record<string, string> = {
    'full-time':  'bg-green-100 text-green-700',
    'part-time':  'bg-blue-100 text-blue-700',
    'freelance':  'bg-purple-100 text-purple-700',
    'internship': 'bg-yellow-100 text-yellow-700',
    'temporary':  'bg-orange-100 text-orange-700',
    'remote':     'bg-indigo-100 text-indigo-700',
  }
  return colors[slug] || 'bg-gray-100 text-gray-700'
}
