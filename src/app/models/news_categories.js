
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
    News_categories.belongsToMany(db.Languages, {
        through: db.News_cate_langs,
      });
      db.Languages.belongsToMany(News_categories, {
        through: db.News_cate_langs,
      });

  };
  return News_categories;
};