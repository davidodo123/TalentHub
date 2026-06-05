import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Building2, ExternalLink, Star } from 'lucide-react'
import { Job } from '@/types'
import { cn, timeAgo, getJobTypeColor } from '@/lib/utils'

interface Props {
  job: Job
  featured?: boolean
}

export default function JobCard({ job, featured }: Props) {
  const title    = job.title.rendered
  const company  = job.meta._company_name || 'Empresa'
  const location = job.meta._job_location || 'Remoto'
  const salary   = job.meta._job_salary
  const logo     = job._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const types    = job._embedded?.['wp:term']?.[0] || []

  return (
    <Link href={`/jobs/${job.slug}`}>
      <article className={cn(
        'card p-5 group cursor-pointer',
        featured && 'border-brand-200 bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-100'
      )}>
        {featured && (
          <div className="flex items-center gap-1 text-brand-600 text-xs font-semibold mb-3">
            <Star className="w-3 h-3 fill-current" /> Destacado
          </div>
        )}

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            {logo ? (
              <Image src={logo} alt={company} width={48} height={48} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{company}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {timeAgo(job.date)}
              </span>
              {salary && (
                <span className="font-medium text-green-600">{salary}</span>
              )}
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1" />
        </div>

        {types.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {types.map(t => (
              <span key={t.id} className={cn('badge', getJobTypeColor(t.slug))}>
                {t.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
