/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
    // serverActions: true,
  },
  reactStrictMode: false,
  serverRuntimeConfig: {
    secret: 'my-32-character-ultra-secure-and-ultra-long-secret',
    SALT_ROUND: 10,
    MAIL_USER: 'nagaoreishi@gmail.com',
    MAIL_PASS: 'uillswsqlfyulgfk',
    MAIL_SERVICE: 'gmail',
    userRoles: {
      Administrator: {
        users: {
          add: true,
          edit: true,
          delete: true,
        },
        news: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        articles: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        news_categories: {
          add: true,
          edit: true,
          delete: true,
        },
        article_categories: {
          add: true,
          edit: true,
          delete: true,
        },
        languages: {
          add: true,
          edit: true,
          delete: true,
          active: true,
        },
        products: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        news_imgs: {
          add: true,
          edit: true,
          delete: true,
        },
        tags: {
          add: true,
          edit: true,
          delete: true,
        },
      },
      Editor: {
        users: {
          add: true,
          edit: true,
          delete: true,
        },
        news: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        articles: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        languages: {
          add: true,
          edit: true,
          delete: true,
          active: true,
        },
        products: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        image: {
          add: true,
          edit: true,
          delete: true,
        },
      },
      Supervisor: {
        users: {
          add: true,
          edit: true,
          delete: true,
        },
        news: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        articles: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        languages: {
          add: true,
          edit: true,
          delete: true,
          active: true,
        },
        products: {
          add: true,
          edit: true,
          delete: true,
          publish: true,
          moveTrash: true,
          recover: true,
        },
        image: {
          add: true,
          edit: true,
          delete: true,
        },
      },
    },
  },

});

// module.exports = nextConfig;
