
import { DataTypes } from "sequelize";

export function iconsModel(sequelize) {
    const attributes = {
        keyIcon: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allownNull: false,
        },
        url: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'relative path form : /upload/icons/icon1.jpg',
            allowNull: false,
        },

    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'icons',
        //timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('icons', attributes, options);
}