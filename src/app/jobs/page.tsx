import { Suspense } from 'react'
import { getJobs, getJobTypes, getJobCategories } from '@/lib/api'
import JobCard from '@/components/jobs/JobCard'
import SearchBar from '@/components/jobs/SearchBar'
import JobFilters from '@/components/jobs/JobFilters'
import PaginationClient from '@/components/jobs/PaginationClient'
import { SearchFilters } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Buscar Empleos' }

interface Props {
  searchParams: Promise<{
    search?: string
    location?: string
    job_type?: string
    category?: string
    page?: string
  }>
}

export default async function JobsPage({ searchParams }: Props) {
  const sp = await searchParams

  const filters: SearchFilters = {
    search:   sp.search,
    location: sp.location,
    job_type: sp.job_type,
    category: sp.category,
    page:     sp.page ? parseInt(sp.page) : 1,
    per_page: 12,
  }

  const [{ jobs, pagination }, types, categories] = await Promise.all([
    getJobs(filters),
    getJobTypes(),
    getJobCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-center mb-8">
        <SearchBar defaultSearch={filters.search} defaultLocation={filters.location} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <Suspense fallback={null}>
            <JobFilters types={types} categories={categories} current={filters} />
          </Suspense>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <strong className="text-gray-900">{pagination.total}</strong> empleos encontrados
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="card p-12 text-center text-gray-500">
              <p className="text-lg font-medium">No se encontraron empleos</p>
              <p className="text-sm mt-2">Prueba con otros filtros o palabras clave</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          <Suspense fallback={null}>
            <PaginationClient pagination={pagination} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
