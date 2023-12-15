
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Product_categories = sequelize.define(
    'Product_categories',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        parent: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allownNull: true,
        },
        category_code: {
            type: DataTypes.STRING(200),
            unique: true,
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
        },
    },
    {
        tableName: 'product_categories',
        timestamps: false,
    }
  );

  Product_categories.associate = function (db) {
    Product_categories.belongsToMany(db.Languages, { through: db.Product_cate_langs });
    db.Languages.belongsToMany(Product_categories, { through: db.Product_cate_langs });
  };
  return Product_categories;
};
