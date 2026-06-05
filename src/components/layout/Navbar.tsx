'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Briefcase, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/jobs',       label: 'Empleos' },
    { href: '/companies',  label: 'Empresas' },
    { href: '/categories', label: 'Categorías' },
    { href: '/about',      label: 'Nosotros' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-600">
            <Briefcase className="w-6 h-6" />
            TalentHub
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-gray-600 hover:text-brand-600 font-medium text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-secondary text-sm">Iniciar sesión</Link>
            <Link href="/post-job" className="btn-primary text-sm">Publicar empleo</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="block py-2 text-gray-700 hover:text-brand-600 font-medium"
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" className="btn-secondary text-sm text-center">Iniciar sesión</Link>
            <Link href="/post-job" className="btn-primary text-sm text-center">Publicar empleo</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
