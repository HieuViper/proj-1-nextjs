('use strict');
module.exports = (sequelize, DataTypes) => {
    const News_languages = sequelize.define(
        'News_languages',
        {

            title: {
                type: DataTypes.STRING(300),
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
                defaultValue: 'undefined',

                comment: 'Title can be null',
            },
            excerpt: {
                type: DataTypes.TEXT,
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
                comment: 'Short Description',
            },
            content: {
                type: DataTypes.TEXT,
                collate: 'utf8mb4_unicode_520_ci',
                comment: 'Content of News',
                allowNull: true,
                defaultValue: 'undefined',
            },
            // NewsId: {
            //     type: DataTypes.BIGINT.UNSIGNED,
            //     primaryKey: true,
            //     references: {
            //         model: 'News', // 'Movies' would also work
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
            //updatedAt: 'post_modified',
            tableName: 'news_languages',
            timestamps: false,
            //indexes: [{ unique: true, fields: ['someUnique'] }],
        }
      );
    //   News_languages.associate = function (models) {
    //   };
      return News_languages;
}