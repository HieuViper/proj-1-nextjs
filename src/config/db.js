import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';
import { newsModel } from './models/news';
import { newsLanguageModel } from './models/news_language';
import { languagesModel } from './models/languages';
import { articleModel } from './models/articles';
import { articleLanguageModel } from './models/articles_language';
import { articleCateLanguageModel } from './models/articles_cate_lang';
import { articleCategoriesModel } from './models/articles_categories';
import { newsCateLanguageModel } from './models/news_cate_language';
import { newsCategoriesModel } from './models/news_categories';

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    //const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    console.log("Starting initialize database, wait ....")
    const config = {
      host: process.env.DB_HOST,     // Change to your MySQL server host
      user: process.env.DB_USER, // Change to your MySQL username
      password: process.env.DB_PASSWORD, // Change to your MySQL password
      //database: process.env.DB_DBNAME,    // The name of your database
    };
    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DBNAME}\`;`);

    // connect to db
    const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT });

    // init models and add them to the exported db object
    db.seq = sequelize;
    db.News = newsModel(sequelize);
    db.News_languages = newsLanguageModel(sequelize);
    db.Languages = languagesModel(sequelize);
    db.Articles = articleModel(sequelize)
    db.Article_languages = articleLanguageModel(sequelize)
    db.ArticleCategories = articleCategoriesModel(sequelize)
    db.Article_cate_langs = articleCateLanguageModel(sequelize)
    db.NewsCategories = newsCategoriesModel(sequelize)
    db.News_cate_langs = newsCateLanguageModel(sequelize)

    //relationship
    db.News.belongsToMany( db.Languages, {through: db.News_languages });
    db.Languages.belongsToMany( db.News, { through: db.News_languages });
    db.Articles.belongsToMany( db.Languages, {through: db.Article_languages });
    db.Languages.belongsToMany( db.Articles, { through: db.Article_languages });

    db.ArticleCategories.belongsToMany(db.Languages, { through: db.Article_cate_langs });
    db.Languages.belongsToMany(db.ArticleCategories, { through: db.Article_cate_langs });
    db.NewsCategories.belongsToMany(db.Languages, {through: db.News_cate_langs});
    db.Languages.belongsToMany(db.NewsCategories, {through: db.News_cate_langs});
    // sync all models with database
    await sequelize.sync({ force: true });

    db.initialized = true;
    console.log("Initializing database is done")
}



/*
import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DBNAME,
  },
});
*/