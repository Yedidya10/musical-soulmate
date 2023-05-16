/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'flagcdn.com'],
  },
}

module.exports = nextConfig
