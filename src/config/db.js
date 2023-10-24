import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';
import { newsModel } from './models/news';

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
      database: process.env.DB_DBNAME,    // The name of your database
    };
    const connection = await mysql.createConnection(config);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DBNAME}\`;`);

    // connect to db
    const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT });

    // init models and add them to the exported db object
    db.seq = sequelize;
    db.News = newsModel(sequelize);
    // sync all models with database
    await sequelize.sync({ alter: true });

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