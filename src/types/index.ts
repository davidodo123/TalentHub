export interface Job {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  date: string
  meta: {
    _job_location?: string
    _company_name?: string
    _company_website?: string
    _company_tagline?: string
    _application?: string
    _job_salary?: string
    _filled?: string
    _featured?: string
  }
  job_types: number[]
  _embedded?: {
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
    author?: Array<{ name: string }>
  }
}

export interface JobType {
  id: number
  name: string
  slug: string
  count: number
}

export interface JobCategory {
  id: number
  name: string
  slug: string
  count: number
}

export interface SearchFilters {
  search?: string
  location?: string
  job_type?: string
  category?: string
  page?: number
  per_page?: number
}

export interface PaginationInfo {
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}
