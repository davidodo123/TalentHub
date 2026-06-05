import Link from 'next/link'
import { Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-brand-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
      <p className="text-gray-500 mb-8 max-w-sm">Esta página no existe o ha sido movida.</p>
      <Link href="/" className="btn-primary">Volver al inicio</Link>
    </div>
  )
}
