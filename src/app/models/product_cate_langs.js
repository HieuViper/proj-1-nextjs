
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Product_cate_langs = sequelize.define(
    'Product_cate_langs',
    {
        name: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: 'undefined',
        },
        description: {
            type: DataTypes.TEXT('long'),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Description',
        },
    },
    {
        tableName: 'product_cate_langs',
        timestamps: false,
    }
  );
  Product_cate_langs.associate = function (db) {

  };
  return Product_cate_langs;
};