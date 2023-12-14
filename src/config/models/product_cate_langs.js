
import { DataTypes } from "sequelize";

export function productCateLanguageModel(sequelize) {
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
        productCategoryId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            references: {
                model: 'product_categories',
                key: 'id'
            }
        },
        LanguageCode: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            references: {
                model: 'languages',
                key: 'code'
            }
        }
    };

    const options = {
        tableName: 'product_cate_langs',
        timestamps: false,
    };

    return sequelize.define('product_cate_langs', attributes, options);
}