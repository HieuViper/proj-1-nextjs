('use strict');
module.exports = (sequelize, DataTypes) => {
  const Product_languages = sequelize.define(
    'Product_languages',
    {
        name: {
            type: DataTypes.STRING(300),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'undefined',
            comment: 'Title can be null',
        },
        short: {
          type: DataTypes.TEXT,
          collate: 'utf8mb4_unicode_520_ci',
          allowNull: true,
          comment: 'Description',
        },
        description: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Description',
        },
    },
    {
        tableName: 'product_languages',
        timestamps: false,
    }
  );
  Product_languages.associate = function (db) {
    // associations can be defined here

  };
  return Product_languages;
};
