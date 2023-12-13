const myConstant  = require("../../store/constant");

('use strict');
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'Articles',
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
        comment: "feature image of the post",
        references: {
          model: 'imgs',
          key: 'url'
      }
      },
      categories: {
        type: DataTypes.STRING(200),
        collate: "utf8mb4_unicode_520_ci",
        allowNull: true,
        defaultValue: "default",
        comment: "Categories has the format: category1, category2, category3",
      },
      post_author: {
        type: DataTypes.STRING(200),
        collate: "utf8mb4_unicode_520_ci",
        comment: "It contains username that is used to login",
        allowNull: false,
        validate: {
          notNull: {
            msg: "You have to insert username of the post_author",
          },
        },
      },
      post_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Publish date of the article",
      },
      post_status: {
        type: DataTypes.STRING(20),
        collate: "utf8mb4_unicode_520_ci",
        defaultValue: myConstant.post.POST_STATUS_DRAFT,
        allowNull: false,
        comment: "post status has 3 states: draft, publish, trash",
        validate: {
          isIn: {
            args: [
              [
                myConstant.post.POST_STATUS_DRAFT,
                myConstant.post.POST_STATUS_PUBLISH,
                myConstant.post.POST_STATUS_TRASH,
              ],
            ],
            msg: "Invalid status of post",
          },
        },
      },
      article_code: {
        type: DataTypes.STRING(200),
        collate: "utf8mb4_unicode_520_ci",
        unique: true,
        allowNull: false,
        comment: "article code is used to build URL",
      },
      modified_by: {
        type: DataTypes.STRING(200),
        collate: "utf8mb4_unicode_520_ci",
        allowNull: true,
        comment: "This one is not the author, he is the one modified the article",
      },
      menu_id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true,
      },
      article_position: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: "The order position of element",
      },
      comment_status: {
        type: DataTypes.STRING(20),
        collate: "utf8mb4_unicode_520_ci",
        allowNull: true,
      },
      comment_count: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      updatedAt: "post_modified",
      tableName: "articles",
      //timestamps: false,
      //indexes: [{ unique: true, fields: ['someUnique'] }],
    }
  );
  Articles.associate = function (db) {
    // associations can be defined here
    Articles.belongsToMany(db.Languages, { through: db.Article_languages });
    db.Languages.belongsToMany(Articles, { through: db.Article_languages });
  };
  return Articles;
};

