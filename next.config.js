/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
    serverActions: true,
  },
  reactStrictMode: false,
  serverRuntimeConfig: {
    secret: 'my secret word CaO HieU HuY',
}
};

module.exports = nextConfig;
