('use strict');
module.exports = (sequelize, DataTypes) => {
  const Article_cate_langs = sequelize.define(
    'Article_cate_langs',
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
        // articleCategoryId: {
        //     type: DataTypes.BIGINT(20).UNSIGNED,
        //     primaryKey: true,
        //     references: {
        //         model: 'article_categories',
        //         key: 'id'
        //     }
        // },
        // languageCode: {
        //     type: DataTypes.STRING(10),
        //     primaryKey: true,
        //     references: {
        //         model: 'languages',
        //         key: 'code'
        //     }
        // }
    },
    {
        tableName: 'article_cate_langs',
        timestamps: false,
    }
  );
//   Article_cate_langs.associate = function (db) {
//     // associations can be defined here

//   };
  return Article_cate_langs;
};

