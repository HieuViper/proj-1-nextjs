('use strict');
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      code: DataTypes.STRING,
      mainImageURL: DataTypes.STRING,
      images: DataTypes.STRING,
      status: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      isWarranty: DataTypes.BOOLEAN,
      warrantyDay: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {tableName:"products"}
  );
  Products.associate = function (db) {
    // associations can be defined here
    Products.hasMany(db.ProductLanguages, {
      as: 'product_languages',
      foreignKey: 'productId',
    });
    db.Languages.hasMany(db.ProductLanguages, {
      as: 'product_languages',
      foreignKey: "LanguageCode",
    });
    // db.ProductLanguages.belongsTo(db.Languages, {
    //   as: 'languages',
    //   foreignKey: "languageId",
    // });
  };
  return Products;
};