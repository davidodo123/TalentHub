'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Pagination from '@/components/ui/Pagination'
import { PaginationInfo } from '@/types'

export default function PaginationClient({ pagination }: { pagination: PaginationInfo }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={handlePageChange}
    />
  )
}
