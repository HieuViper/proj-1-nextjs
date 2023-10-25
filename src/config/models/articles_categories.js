
import { DataTypes } from "sequelize";

export function articleCategoriesModel(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        category_code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
        },
    };

    const options = {
        tableName: 'article_categories',
        timestamps: false,
    };

    return sequelize.define('article_categories', attributes, options);
}