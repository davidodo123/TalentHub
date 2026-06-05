'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { JobType, JobCategory, SearchFilters } from '@/types'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface Props {
  types: JobType[]
  categories: JobCategory[]
  current: SearchFilters
}

export default function JobFilters({ types, categories, current }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => router.push(pathname)

  const hasFilters = current.job_type || current.category

  return (
    <div className="space-y-5">
      {hasFilters && (
        <button onClick={clearAll}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium">
          <X className="w-3 h-3" /> Limpiar filtros
        </button>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tipo de contrato</h3>
        <div className="space-y-1">
          {types.map(t => (
            <button key={t.id}
              onClick={() => updateFilter('job_type', current.job_type === t.slug ? null : t.slug)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between',
                current.job_type === t.slug
                  ? 'bg-brand-100 text-brand-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              )}>
              <span>{t.name}</span>
              <span className="text-xs text-gray-400">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Categoría</h3>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {categories.map(c => (
            <button key={c.id}
              onClick={() => updateFilter('category', current.category === c.slug ? null : c.slug)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between',
                current.category === c.slug
                  ? 'bg-brand-100 text-brand-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              )}>
              <span className="truncate">{c.name}</span>
              <span className="text-xs text-gray-400 ml-1 flex-shrink-0">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
