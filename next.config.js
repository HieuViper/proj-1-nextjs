/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
        serverActions: true,
      },
      reactStrictMode: false
}

module.exports = nextConfig
