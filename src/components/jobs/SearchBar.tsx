'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface Props {
  defaultSearch?: string
  defaultLocation?: string
}

export default function SearchBar({ defaultSearch = '', defaultLocation = '' }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState(defaultSearch)
  const [location, setLocation] = useState(defaultLocation)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search)   params.set('search', search)
    if (location) params.set('location', location)
    params.set('page', '1')
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl">
      <div className="flex items-center flex-1 gap-2 px-3">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Puesto, empresa o palabra clave..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm py-1"
        />
      </div>
      <div className="flex items-center gap-2 px-3 sm:border-l border-gray-200">
        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Ciudad, país o 'Remoto'"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm py-1"
        />
      </div>
      <button type="submit" className="btn-primary whitespace-nowrap">
        Buscar empleo
      </button>
    </form>
  )
}
