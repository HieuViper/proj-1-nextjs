('use strict');
module.exports = (sequelize, DataTypes) => {
  const Article_languages = sequelize.define(
    'Article_languages',
    {
      title: {
        type: DataTypes.STRING(300),
        collate: "utf8mb4_unicode_520_ci",
        allowNull: true,
        defaultValue: "undefined",
        comment: "Title can be null",
      },
      excerpt: {
        type: DataTypes.TEXT,
        collate: "utf8mb4_unicode_520_ci",
        allowNull: true,
        comment: "Short Description",
      },
      content: {
        type: DataTypes.TEXT,
        collate: "utf8mb4_unicode_520_ci",
        comment: "Content of article",
        allowNull: true,
        defaultValue: "undefined",
      },
      // articleId: {
      //   type: DataTypes.BIGINT(20).UNSIGNED,
      //   primaryKey: true,
      //   references: {
      //     model: 'Articles',
      //     key: 'id'
      //   },
      // },
      // languageCode: {
      //     type: DataTypes.STRING(10),
      //     primaryKey: true,
      //     references: {
      //          model: 'Languages',
      //          key: 'code'
      //     }
      // }

    },
    {
      //updatedAt: 'post_modified',
      tableName: "article_languages",
      timestamps: false,
      //indexes: [{ unique: true, fields: ['someUnique'] }],
    }
  );
  // Article_languages.associate = function (db) {
  //   // associations can be defined here

  // };
  return Article_languages;
};
