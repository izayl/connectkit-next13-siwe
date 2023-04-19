/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      net: false,
      tls: false,
      "pino-pretty": false,
      "encoding": false,
      "lokijs": false,
    }

    return config
  }
}

module.exports = nextConfig
