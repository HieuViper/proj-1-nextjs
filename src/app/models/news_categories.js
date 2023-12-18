
('use strict');
module.exports = (sequelize, DataTypes) => {
  const News_categories = sequelize.define(
    'News_categories',
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
            collate: 'utf8mb4_unicode_520_ci',
            unique: true,
            defaultValue: '',
        },
    },
    {
        tableName: 'news_categories',
        timestamps: false,
    }
  );
  News_categories.associate = function (db) {
    // associations can be defined here
    News_categories.hasMany(db.News_cate_langs, {
      as: 'news_cate_langs',
      foreignKey: 'news_categoryId',
    });
    db.News_cate_langs.belongsTo(News_categories, {
        as: 'news_categories',
        foreignKey: "news_categoryId",
    });

  };
  return News_categories;
};