
import { DataTypes } from "sequelize";

export function articleCateLanguageModel(sequelize) {
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
    };

    const options = {
        tableName: 'article_cate_langs',
        timestamps: false,
    };

    return sequelize.define('article_cate_langs', attributes, options);
}