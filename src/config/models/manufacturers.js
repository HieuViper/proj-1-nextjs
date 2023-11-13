
import { DataTypes } from "sequelize";

export function manufacturersModel(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'website of manufacturer',
            unique: true,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'website of manufacturer',
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,

        },
        address: {
            type: DataTypes.STRING(50),
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'address of manufacturer',
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }


    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'manufacturers',
        //timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('manufacturers', attributes, options);
}