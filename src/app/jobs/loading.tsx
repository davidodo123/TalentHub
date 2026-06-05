export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-12 bg-gray-200 rounded-xl mb-8 max-w-2xl mx-auto" />
      <div className="flex gap-8">
        <div className="w-64 space-y-3 hidden lg:block">
          {[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-gray-200 rounded-lg" />)}
        </div>
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-5 h-36">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
