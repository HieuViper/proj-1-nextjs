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
import { tagLangsModel } from "./models/tag_langs";
import { tagsModel } from "./models/tags";
import { iconsModel } from "./models/icons";
import { manufacturersModel } from "./models/manufacturers";
import { manufacturerLanguagesModel } from "./models/manufacturer_languages";
import { productsModel } from "./models/products";
import { productsLanguagesModel } from "./models/products_languages";
import { productCategoriesModel } from "./models/product_categories";
import { productCateLanguageModel } from "./models/product_cate_langs";
import { productGuaranteeModel } from "./models/product_guarantee";
import { productTransportModel } from "./models/product_transport";
import { usersModel } from "./models/users";
import { imgsModel } from "./models/imgs";

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+07:00",
  }
);

export const db = {
  initialized: false,
  initialize,
  seq: sequelize,
  News: newsModel( sequelize ),
  News_languages: newsLanguageModel( sequelize ),
  Languages: languagesModel( sequelize ),
  Articles: articleModel( sequelize ),
  Article_languages: articleLanguageModel( sequelize ),
  Article_categories: articleCategoriesModel( sequelize ),
  Article_cate_langs: articleCateLanguageModel( sequelize ),
  News_categories: newsCategoriesModel( sequelize ),
  News_cate_langs: newsCateLanguageModel( sequelize ),
  Tags: tagsModel( sequelize ),
  Tag_langs: tagLangsModel( sequelize ),
  Icons: iconsModel( sequelize ),
  Manufacturers: manufacturersModel( sequelize ),
  Manufacturer_languages: manufacturerLanguagesModel( sequelize ),
  Products: productsModel( sequelize ),
  Products_languages: productsLanguagesModel( sequelize ),
  Product_transport: productTransportModel( sequelize ),
  Product_guarantee: productGuaranteeModel( sequelize ),
  Product_categories: productCategoriesModel( sequelize ),
  Product_cate_langs: productCateLanguageModel( sequelize ),
  Users: usersModel( sequelize ),
  Imgs: imgsModel( sequelize ),
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

  //relationship with table languages
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

  db.Manufacturers.belongsToMany( db.Languages, { through: db.Manufacturer_languages } );
  db.Languages.belongsToMany( db.Manufacturers, { through: db.Manufacturer_languages } );

  db.Products.belongsToMany( db.Languages, { through: db.Products_languages } );
  db.Languages.belongsToMany( db.Products, { through: db.Products_languages } );

  db.Product_categories.belongsToMany( db.Languages, { through: db.Product_cate_langs } );
  db.Languages.belongsToMany( db.Product_categories, { through: db.Product_cate_langs } );

  db.Languages.hasMany( db.Product_transport );
  db.Product_transport.belongsTo( db.Languages );

  db.Languages.hasMany( db.Product_guarantee );
  db.Product_guarantee.belongsTo ( db.Languages );

  //relation ship one-to-many with products
  db.Manufacturers.hasMany( db.Products );
  db.Products.belongsTo( db.Manufacturers );

  //relation ship one-to-many with images table
  // db.Imgs.hasMany( db.Users, { foreignKey: 'image' } );
  // db.Users.belongsTo( db.Imgs );

  // db.Imgs.hasMany( db.News, { foreignKey: 'image' }  );
  // db.News.belongsTo( db.Imgs);

  // db.Imgs.hasMany( db.Articles );
  // db.Articles.belongsTo( db.Imgs, { foreignKey: 'image' } );

  // sync all models with database
   await sequelize.sync({ force: true });

  db.initialized = true;
  console.log("Initializing database is done");
}
