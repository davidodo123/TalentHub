import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Building2, Globe, ArrowLeft, Briefcase, DollarSign } from 'lucide-react'
import { getJob, getJobs } from '@/lib/api'
import { timeAgo, getJobTypeColor, cn } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) return { title: 'Empleo no encontrado' }
  return {
    title: `${job.title.rendered} en ${job.meta._company_name || 'Empresa'}`,
    description: job.content.rendered.replace(/<[^>]*>/g, '').slice(0, 155),
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) notFound()

  const title    = job.title.rendered
  const company  = job.meta._company_name || 'Empresa'
  const location = job.meta._job_location || 'No especificada'
  const website  = job.meta._company_website
  const salary   = job.meta._job_salary
  const apply    = job.meta._application
  const logo     = job._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const types    = job._embedded?.['wp:term']?.[0] || []
  const tagline  = job.meta._company_tagline

  const { jobs: relatedJobs } = await getJobs({ per_page: 3 })
  const related = relatedJobs.filter(j => j.id !== job.id).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/jobs" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a empleos
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="card p-8 mb-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {logo ? (
                  <Image src={logo} alt={company} width={64} height={64} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1">{company}</p>
                {tagline && <p className="text-sm text-gray-400 mt-0.5">{tagline}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" />{location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" />{timeAgo(job.date)}</span>
              {salary && <span className="flex items-center gap-1.5 text-green-600 font-medium"><DollarSign className="w-4 h-4" />{salary}</span>}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-600 hover:underline">
                  <Globe className="w-4 h-4" />{website.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>

            {types.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {types.map(t => (
                  <span key={t.id} className={cn('badge', getJobTypeColor(t.slug))}>{t.name}</span>
                ))}
              </div>
            )}

            {apply && (
              <div className="mt-6">
                <a href={apply.startsWith('http') ? apply : `mailto:${apply}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Solicitar empleo
                </a>
              </div>
            )}
          </div>

          <div className="card p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Descripción del puesto</h2>
            <div
              className="text-gray-600 leading-relaxed [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>a]:text-brand-600 [&>a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: job.content.rendered }}
            />
          </div>
        </div>

        <aside className="w-full lg:w-72 space-y-5">
          {apply && (
            <div className="card p-5 bg-gradient-to-br from-brand-600 to-brand-500 text-white">
              <h3 className="font-semibold mb-2">¿Te interesa este empleo?</h3>
              <p className="text-indigo-100 text-sm mb-4">Aplica ahora y da el siguiente paso en tu carrera.</p>
              <a href={apply.startsWith('http') ? apply : `mailto:${apply}`}
                target="_blank" rel="noopener noreferrer"
                className="block text-center bg-white text-brand-700 font-semibold py-2.5 rounded-lg hover:bg-indigo-50 transition-colors">
                Solicitar ahora
              </a>
            </div>
          )}

          {related.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Empleos similares</h3>
              <div className="space-y-3">
                {related.map(j => (
                  <Link key={j.id} href={`/jobs/${j.slug}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors">
                    <p className="font-medium text-sm text-gray-900 truncate">{j.title.rendered}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{j.meta._company_name || 'Empresa'}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
