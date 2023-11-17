/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
    serverActions: true,
  },
  reactStrictMode: false,
  serverRuntimeConfig: {
    secret: 'my-32-character-ultra-secure-and-ultra-long-secret',
}
};

module.exports = nextConfig;
