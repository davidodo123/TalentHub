import axios from 'axios'
import { Job, JobType, JobCategory, SearchFilters, PaginationInfo } from '@/types'

const wpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WP_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export interface JobsResponse {
  jobs: Job[]
  pagination: PaginationInfo
}

export async function getJobs(filters: SearchFilters = {}): Promise<JobsResponse> {
  const params: Record<string, string | number> = {
    _embed: 1,
    per_page: filters.per_page || 12,
    page: filters.page || 1,
  }

  if (filters.search)   params.search = filters.search
  if (filters.location) params['meta_query[0][key]'] = '_job_location'
  if (filters.location) params['meta_query[0][value]'] = filters.location
  if (filters.location) params['meta_query[0][compare]'] = 'LIKE'
  if (filters.job_type) params.job_types = filters.job_type
  if (filters.category) params.job_categories = filters.category

  try {
    const res = await wpApi.get('/wp/v2/job_listing', { params })
    return {
      jobs: res.data,
      pagination: {
        total:       parseInt(res.headers['x-wp-total'] || '0'),
        totalPages:  parseInt(res.headers['x-wp-totalpages'] || '1'),
        currentPage: filters.page || 1,
        perPage:     filters.per_page || 12,
      },
    }
  } catch {
    return {
      jobs: [],
      pagination: { total: 0, totalPages: 1, currentPage: 1, perPage: 12 },
    }
  }
}

export async function getJob(slug: string): Promise<Job | null> {
  try {
    const res = await wpApi.get('/wp/v2/job_listing', {
      params: { slug, _embed: 1 },
    })
    return res.data[0] || null
  } catch {
    return null
  }
}

export async function getJobTypes(): Promise<JobType[]> {
  try {
    const res = await wpApi.get('/wp/v2/job_types', { params: { per_page: 100 } })
    return res.data
  } catch {
    return []
  }
}

export async function getJobCategories(): Promise<JobCategory[]> {
  try {
    const res = await wpApi.get('/wp/v2/job_categories', { params: { per_page: 100 } })
    return res.data
  } catch {
    return []
  }
}

export async function getFeaturedJobs(): Promise<Job[]> {
  try {
    const res = await wpApi.get('/wp/v2/job_listing', {
      params: { _embed: 1, per_page: 6, meta_key: '_featured', meta_value: '1' },
    })
    return res.data
  } catch {
    return []
  }
}
