/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: '**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: '**',
      // },
    ],
    domains: [
      // 'cdn.web.com',
    ],
  },
  env: {
    // Se puede agregar env y leerlos directos de .env
    // HOST: process.env.HOST,
    // API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
