('use strict');
const myConstant  = require("../../store/constant");

module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define(
        'News',
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allownNull: false,
            },
            image: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: 'feature image of the post',
                references: {
                    model: 'news_imgs',
                    key: 'url'
                }
            },
            categories: {
                type: DataTypes.STRING(200),
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
                defaultValue: 'default',
                comment: 'Categories has the format: category1, category2, category3',
            },
            tags: {
                type: DataTypes.STRING(200),
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
                comment: 'Tags has the format: tag1, tag2, tag3',
            },
            post_author: {
                type: DataTypes.STRING(200),
                collate: 'utf8mb4_unicode_520_ci',
                comment: 'It contains username that is used to login',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'You have to insert username of the post_author',
                    }
                },
            },
            post_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'Publish date of the news',
            },
            post_status: {
                type: DataTypes.STRING(20),
                collate: 'utf8mb4_unicode_520_ci',
                defaultValue: myConstant.post.POST_STATUS_DRAFT,
                allowNull: false,
                comment: 'post status has 3 states: draft, publish, trash',
                validate: {
                    isIn: {
                        args: [[myConstant.post.POST_STATUS_DRAFT, myConstant.post.POST_STATUS_PUBLISH, myConstant.post.POST_STATUS_TRASH]],
                        msg: 'Invalid status of post',
                    }
                },
            },
            news_code: {
                type: DataTypes.STRING(200),
                collate: 'utf8mb4_unicode_520_ci',
                unique: true,
                allowNull: false,
                comment: 'news code is used to build URL',
            },
            modified_by: {
                type: DataTypes.STRING(200),
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
                comment: 'This one is not the author, he is the one modified the news',
            },
            menu_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: true,
            },
            news_position: {
                type: DataTypes.TINYINT(1),
                allowNull: true,
                defaultValue: 0,
                comment: 'it has the value 1 that means the news is prioritied',
            },
            comment_status: {
                type: DataTypes.STRING(20),
                collate: 'utf8mb4_unicode_520_ci',
                allowNull: true,
            },
            comment_count: {
                type: DataTypes.INTEGER(10),
                allowNull: true,
                defaultValue: 0,
            },
        },
        {
            updatedAt: 'post_modified',
            tableName: 'news',
            //timestamps: false,
            //indexes: [{ unique: true, fields: ['someUnique'] }],
        }
      );

      News.associate = function (db) {
        // associations can be defined here
        // News.belongsToMany(db.Languages, { through: db.News_languages });
        // db.Languages.belongsToMany(News, { through: db.News_languages });
        News.hasMany(db.News_languages, {
            as: 'news_languages',
            foreignKey: 'newsId',
          });
        db.News_languages.belongsTo(News, {
            as: 'news',
            foreignKey: "newsId",
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
      };
      return News;

}