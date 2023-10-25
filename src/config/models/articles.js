import { DataTypes } from "sequelize";

export function articleModel(sequelize) {
    const attributes = {
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
        },
        categories: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'default',
            comment: 'Categories has the format: category1, category2, category3',
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
            comment: 'Publish date of the article',
        },
        post_status: {
            type: DataTypes.STRING(20),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: process.env.POST_STATUS_DRAFT,
            allowNull: false,
            comment: 'post status has 3 states: draft, publish, trash',
            validate: {
                isIn: {
                    args: [[process.env.POST_STATUS_DRAFT, process.env.POST_STATUS_PUBLISH, process.env.POST_STATUS_TRASH]],
                    msg: 'Invalid status of post',
                }
            },
        },
        article_code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: false,
            comment: 'article code is used to build URL',
        },
        modified_by: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'This one is not the author, he is the one modified the article',
        },
        menu_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true,
        },
        article_position: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 0,
            comment: 'it has the value 1 that means the article is prioritied',
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
    };

    const options = {
        updatedAt: 'post_modified',
        tableName: 'articles',
        //timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('articles', attributes, options);
}