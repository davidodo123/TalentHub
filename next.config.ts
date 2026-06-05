import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: 'talenthub.local' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'cms.damen.sbs' },
    ],
  },
  async rewrites() {
    const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL
    if (!wpUrl) return []
    return [
      {
        source: '/api/wp/:path*',
        destination: `${wpUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
