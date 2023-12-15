
import { DataTypes } from "sequelize";

export function productsLanguagesModel(sequelize) {
    const attributes = {
        name: {
            type: DataTypes.STRING(300),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'undefined',
            comment: 'Title can be null',
        },
        guarantee: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Guarantee Description',   //format: imgKey~Guarantee description 1, imgKey2~Gurateen description 2
        },
        transport: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Transport Description',       //format: imgKey1~Transport description 1, imgKey2~Transport description 2
        },
        description: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Description',
        },
    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'products_languages',
        timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('products_languages', attributes, options);
}