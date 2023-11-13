
import { DataTypes } from "sequelize";

export function productCategoriesModel(sequelize) {
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
            unique: true,
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
        },
    };

    const options = {
        tableName: 'product_categories',
        timestamps: false,
    };

    return sequelize.define('product_categories', attributes, options);
}