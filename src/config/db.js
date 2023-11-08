import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { articleCateLanguageModel } from "./models/article_cate_langs";
import { articleCategoriesModel } from "./models/article_categories";
import { articleLanguageModel } from "./models/article_languages";
import { articleModel } from "./models/articles";
import { languagesModel } from "./models/languages";
import { newsModel } from "./models/news";
import { newsCateLanguageModel } from "./models/news_cate_langs";
import { newsCategoriesModel } from "./models/news_categories";
import { newsLanguageModel } from "./models/news_languages";
import { tagsModel } from "./models/tags";
import { tagLangsModel } from "./models/tag_langs";

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, dialect: process.env.DB_DIALECT, pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+07:00',
  },
);

export const db = {
  initialized: false,
  initialize,
  seq: sequelize,
  News: newsModel(sequelize),
  News_languages: newsLanguageModel(sequelize),
  Languages: languagesModel(sequelize),
  Articles: articleModel(sequelize),
  Article_languages: articleLanguageModel(sequelize),
  Article_categories: articleCategoriesModel(sequelize),
  Article_cate_langs: articleCateLanguageModel(sequelize),
  News_categories: newsCategoriesModel(sequelize),
  News_cate_langs: newsCateLanguageModel(sequelize),
  Tags: tagsModel(sequelize),
  Tag_langs: tagLangsModel(sequelize),
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
  //const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
  console.log("Starting initialize database, wait ....");
  const config = {
    host: process.env.DB_HOST, // Change to your MySQL server host
    user: process.env.DB_USER, // Change to your MySQL username
    password: process.env.DB_PASSWORD, // Change to your MySQL password
    //database: process.env.DB_DBNAME,    // The name of your database
  };
  const connection = await mysql.createConnection(config);
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DBNAME}\`;`
  );

  // connect to db
  // const sequelize = new Sequelize(
  //   process.env.DB_DBNAME,
  //   process.env.DB_USER,
  //   process.env.DB_PASSWORD,
  //   { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT, pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   },
  //   timezone: '+07:00',
  //  },
  // );

  // // init models and add them to the exported db object
  // db.seq = sequelize;
  // db.News = newsModel(sequelize);
  // db.News_languages = newsLanguageModel(sequelize);
  // db.Languages = languagesModel(sequelize);
  // db.Articles = articleModel(sequelize);
  // db.Article_languages = articleLanguageModel(sequelize);
  // db.Article_categories = articleCategoriesModel(sequelize);
  // db.Article_cate_langs = articleCateLanguageModel(sequelize);
  // db.News_categories = newsCategoriesModel(sequelize);
  // db.News_cate_langs = newsCateLanguageModel(sequelize);
  // db.Tags = tagsModel(sequelize);
  // db.Tag_langs = tagLangsModel(sequelize);

  //relationship
  db.News.belongsToMany(db.Languages, { through: db.News_languages });
  db.Languages.belongsToMany(db.News, { through: db.News_languages });
  db.Articles.belongsToMany(db.Languages, { through: db.Article_languages });
  db.Languages.belongsToMany(db.Articles, { through: db.Article_languages });


  db.Article_categories.belongsToMany(db.Languages, {
    through: db.Article_cate_langs,
  });
  db.Languages.belongsToMany(db.Article_categories, {
    through: db.Article_cate_langs,
  });
  db.News_categories.belongsToMany(db.Languages, {
    through: db.News_cate_langs,
  });
  db.Languages.belongsToMany(db.News_categories, {
    through: db.News_cate_langs,
  });
  db.Tags.belongsToMany(db.Languages, { through: db.Tag_langs });
  db.Languages.belongsToMany(db.Tags, { through: db.Tag_langs });
  // sync all models with database
  // await sequelize.sync({ alter: true });

  db.initialized = true;
  console.log("Initializing database is done");
}
