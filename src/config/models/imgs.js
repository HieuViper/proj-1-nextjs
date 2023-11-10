
import { DataTypes } from "sequelize";

export function imgsModel(sequelize) {
    const attributes = {
        url: {
            type: DataTypes.STRING(200),
            primaryKey: true,
            allownNull: false,
            comment: 'url has format: /upload/jan2023'
        },
        alt: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
            allownNull: true,
        },
        caption: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
            allownNull: true,
        },
        srcset: {
            type: DataTypes.STRING(400),
            collate: 'utf8mb4_unicode_520_ci',
            defaultValue: '',
            allownNull: true,
        }
    };

    const options = {
        tableName: 'imgs',
        timestamps: false,
    };

    return sequelize.define('imgs', attributes, options);
}