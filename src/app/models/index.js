const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config()

const basename = path.basename(__filename);
const db = {}
let sequelize = new Sequelize(
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
console.log('filename: ', __filename);
console.log('dirname: ', __dirname);
const  dirName = __dirname.includes('.next')?path.resolve(process.cwd(), 'src/app/models'):__dirname;
console.log('dirname:', dirName);
fs.readdirSync(dirName)
  .filter((file) => {
    return (
      file !== "index.js" && file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    if(__dirname.includes('.next')){
      const model = require("/src/app/models/"+file)(
        sequelize,
        Sequelize.DataTypes,
      );
      db[model.name]=model;
    }else{
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
module.exports = db;