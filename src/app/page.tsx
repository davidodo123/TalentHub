import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'
import SearchBar from '@/components/jobs/SearchBar'
import JobCard from '@/components/jobs/JobCard'
import { getFeaturedJobs, getJobTypes, getJobCategories } from '@/lib/api'

async function HeroStats() {
  const [types, categories] = await Promise.all([getJobTypes(), getJobCategories()])
  const totalJobs = types.reduce((a, t) => a + t.count, 0)

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-indigo-200">
      <span><strong className="text-white text-lg">{totalJobs.toLocaleString()}+</strong> empleos activos</span>
      <span><strong className="text-white text-lg">{categories.length}</strong> categorías</span>
      <span><strong className="text-white text-lg">100%</strong> gratuito para candidatos</span>
    </div>
  )
}

async function FeaturedJobs() {
  const jobs = await getFeaturedJobs()
  if (!jobs.length) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Empleos destacados</h2>
          <p className="text-gray-500 mt-1">Oportunidades seleccionadas para ti</p>
        </div>
        <Link href="/jobs" className="flex items-center gap-1 text-brand-600 font-medium hover:gap-2 transition-all text-sm">
          Ver todos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => <JobCard key={job.id} job={job} featured />)}
      </div>
    </section>
  )
}

async function CategoryGrid() {
  const categories = await getJobCategories()

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Explorar por categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map(cat => (
            <Link key={cat.id} href={`/jobs?category=${cat.slug}`}
              className="card p-4 text-center hover:border-brand-300 hover:bg-brand-50 transition-all group">
              <p className="font-medium text-sm text-gray-800 group-hover:text-brand-700">{cat.name}</p>
              <p className="text-xs text-gray-400 mt-1">{cat.count} empleos</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            🚀 El futuro del empleo está aquí
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Encuentra el trabajo<br />
            <span className="text-yellow-300">que mereces</span>
          </h1>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            Miles de oportunidades laborales de las mejores empresas del mundo, en un solo lugar.
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <Suspense fallback={<div className="h-12 mt-8" />}>
            <HeroStats />
          </Suspense>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap,        title: 'Búsqueda inteligente', desc: 'Filtra por ubicación, tipo de contrato, salario y más.' },
            { icon: Shield,     title: 'Empresas verificadas',  desc: 'Solo empleos reales de empresas con perfil verificado.' },
            { icon: TrendingUp, title: 'Alertas en tiempo real', desc: 'Recibe notificaciones de nuevos empleos que encajan contigo.' },
          ].map(f => (
            <div key={f.title} className="card p-6">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 mx-8 rounded-xl" />}>
        <FeaturedJobs />
      </Suspense>

      <Suspense fallback={<div className="h-64" />}>
        <CategoryGrid />
      </Suspense>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">¿Tienes una vacante?</h2>
          <p className="text-indigo-100 mb-8">Publica tu oferta y llega a miles de candidatos cualificados.</p>
          <Link href="/post-job" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-block">
            Publicar empleo gratis
          </Link>
        </div>
      </section>
    </>
  )
}
