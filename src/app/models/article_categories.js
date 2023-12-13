('use strict');
module.exports = (sequelize, DataTypes) => {
  const Article_categories = sequelize.define(
    'Article_categories',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        category_code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            unique: true,
            defaultValue: '',
        },
    },
    {
        tableName: 'article_categories',
        timestamps: false,
    }
  );
  Article_categories.associate = function (db) {
    // associations can be defined here
    Article_categories.belongsToMany(db.Languages, {
        through: db.Article_cate_langs,
      });
    db.Languages.belongsToMany(Article_categories, {
    through: db.Article_cate_langs,
    });
  };
  return Article_categories;
};
