'use strict';
module.exports = (sequelize, DataTypes) => {
  const Languages = sequelize.define(
    'Languages',
    {
      code: {
          type: DataTypes.STRING(10),
          collate: 'utf8mb4_unicode_520_ci',
          allownNull: false,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING(100),
          collate: 'utf8mb4_unicode_520_ci',
          allowNull: false,
          validate: {
              notNull: {
                  msg: 'You have to insert name of the language',
              }
          },
      },
      description: {
          type: DataTypes.STRING(200),
          collate: 'utf8mb4_unicode_520_ci',
          allowNull: true,
          comment: 'Short Description',
      },
      active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          comment: 'Active language',
      },
    },
    {
      tableName: 'languages',
      timestamps: false,
    }
  );
  Languages.associate = function (db) {
    // associations can be defined here
    //manufacturer
    db.Languages.hasMany(db.Manufacturer_languages, {
      as: 'manufacturer_languages',
      foreignKey: "languageCode",
    });
    db.Manufacturer_languages.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //product
    db.Languages.hasMany(db.Product_languages, {
      as: 'product_languages',
      foreignKey: "languageCode",
    });
    db.Product_languages.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //Product Category
    db.Languages.hasMany(db.Product_cate_langs, {
      as: 'product_cate_langs',
      foreignKey: "languageCode",
    });
    db.Product_cate_langs.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //Article
    db.Languages.hasMany(db.Article_languages, {
      as: 'article_languages',
      foreignKey: "languageCode",
    });
    db.Article_languages.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //Article category
    db.Languages.hasMany(db.Article_cate_langs, {
      as: 'article_cate_langs',
      foreignKey: "languageCode",
    });
    db.Article_cate_langs.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //News
    db.Languages.hasMany(db.News_languages, {
      as: 'news_languages',
      foreignKey: "languageCode",
    });
    db.News_languages.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //News_category
    db.Languages.hasMany(db.News_cate_langs, {
      as: 'news_cate_langs',
      foreignKey: "languageCode",
    });
    db.News_cate_langs.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
    //Tag
    db.Languages.hasMany(db.Tag_langs, {
      as: 'tag_langs',
      foreignKey: "languageCode",
    });
    db.Tag_langs.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });
  };
  return Languages;
};
