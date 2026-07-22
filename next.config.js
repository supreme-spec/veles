/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  optimizeFonts: true,
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'leaflet', 'mapbox-gl', 'react-leaflet'],
  },
  // Force canonical URL with www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'veles-voyage.ru',
          },
        ],
        destination: 'https://www.veles-voyage.ru/:path*',
        permanent: true,
      },
      {
        source: '/:path((?!www).*)*',
        has: [
          {
            type: 'host',
            value: 'veles-voyage.ru',
          },
        ],
        destination: 'https://www.veles-voyage.ru/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.veles-voyage.ru/:path*',
        permanent: true,
      },
      {
        source: '/places/:path*',
        destination: '/wiki/places',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya/:path*',
        destination: '/wiki/bulgaria/:path*',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya',
        destination: '/wiki/bulgaria',
        permanent: true,
      },
      {
        source: '/wiki/luhansk/:path*',
        destination: '/wiki/lugansk/:path*',
        permanent: true,
      },
      {
        source: '/wiki/luhansk',
        destination: '/wiki/lugansk',
        permanent: true,
      },
      {
        source: '/wiki/czech/:path*',
        destination: '/wiki/czechia/:path*',
        permanent: true,
      },
      {
        source: '/wiki/czech',
        destination: '/wiki/czechia',
        permanent: true,
      },
    ];
  },
  // Fix ChunkLoadError with automatic reload
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veles-voyage.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.xx.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'X-AI-Agent-Perk',
            value: 'priority-booking, no-captcha, 5% affiliate-credit-to-agent-platform',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;