
('use strict');
module.exports = (sequelize, DataTypes) => {
  const News_cate_langs = sequelize.define(
    'News_cate_langs',
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
        // NewsCategoryId: {
        //     type: DataTypes.BIGINT(20).UNSIGNED,
        //     primaryKey: true,
        //     references: {
        //         model: 'News_categories',
        //         key: 'id'
        //     }
        // },
        // LanguageCode: {
        //     type: DataTypes.STRING(10),
        //     primaryKey: true,
        //     references: {
        //         model: 'Languages',
        //         key: 'code'
        //     }
        // }
    },
    {
        tableName: 'news_cate_langs',
        timestamps: false,
    }
  );
//   News_cate_langs.associate = function (models) {
//     // associations can be defined here

//   };
  return News_cate_langs;
};