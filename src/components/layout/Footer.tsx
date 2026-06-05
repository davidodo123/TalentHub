import Link from 'next/link'
import { Briefcase, X, Link2, GitBranch } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <Briefcase className="w-5 h-5" />
              TalentHub
            </Link>
            <p className="text-brand-100 text-sm leading-relaxed max-w-sm">
              El portal de empleo más moderno. Conectamos talento con oportunidades reales en todo el mundo.
            </p>
            <div className="flex gap-4 mt-4">
              {[X, Link2, GitBranch].map((Icon, i) => (
                <a key={i} href="#" className="text-brand-300 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Para candidatos', links: ['Buscar empleo', 'Por categoría', 'Por ubicación', 'Alertas de empleo'] },
            { title: 'Para empresas',   links: ['Publicar empleo', 'Planes', 'Dashboard', 'Soporte'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-brand-300 hover:text-white text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-brand-400 text-xs">
          <p>© {new Date().getFullYear()} TalentHub. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
