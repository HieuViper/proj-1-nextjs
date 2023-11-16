
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
        },
        author: {
            type: DataTypes.STRING(200),
            collate: "utf8mb4_unicode_520_ci",
            comment: "It contains username that is used to login",
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(50),
            comment: "image type",
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING(50),
            commnent: "image size",
            allowNull: true,
        },
        dimensons: {
            type: DataTypes.STRING(50),
            comment: "image dimensions",
            allowNull: true,
        }
    };

    const options = {
        tableName: 'imgs',
        timestamps: true,
    };

    return sequelize.define('imgs', attributes, options);
}