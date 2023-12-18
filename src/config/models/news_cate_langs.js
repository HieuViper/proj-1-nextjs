
import { DataTypes } from "sequelize";

export function newsCateLanguageModel(sequelize) {
    const attributes = {
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
        news_categoryId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            references: {
                model: 'news_categories',
                key: 'id'
            }
        },
        languageCode: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            references: {
                model: 'languages',
                key: 'code'
            }
        }
    };

    const options = {
        tableName: 'news_cate_langs',
        timestamps: false,
    };

    return sequelize.define('news_cate_langs', attributes, options);
}