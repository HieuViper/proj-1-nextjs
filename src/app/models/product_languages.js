'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductLanguages = sequelize.define(
    'ProductLanguages',
    {
      productId: DataTypes.INTEGER,
      name:{
        type: DataTypes.STRING(200),
        collate: 'utf8mb4_unicode_520_ci',
      },
      short:{
        type: DataTypes.TEXT('long'),
        collate: 'utf8mb4_unicode_520_ci',
        allowNull: true,
        comment: 'Short',
      },
      description: {
        type: DataTypes.TEXT('long'),
        collate: 'utf8mb4_unicode_520_ci',
        allowNull: true,
        comment: 'Description',
      }
    },
    {tableName:"product_languages"}
  );
  ProductLanguages.associate = function (models) {
  };
  return ProductLanguages;
};