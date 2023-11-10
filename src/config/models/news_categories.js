
import { DataTypes } from "sequelize";

export function newsCategoriesModel(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        parent: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allownNull: true,
        },
        category_code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            unique: true,
            defaultValue: '',
        },
    };

    const options = {
        tableName: 'news_categories',
        timestamps: false,
    };

    return sequelize.define('news_categories', attributes, options);
}