
import { DataTypes } from "sequelize";

export function manufacturerLanguagesModel(sequelize) {
    const attributes = {
        name: {
            type: DataTypes.STRING(300),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'undefined',
            comment: 'Name can be null',
        },
        description: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Description',
        },
        manufacturerId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            references: {
                model: 'manufacturers', // 'Movies' would also work
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
        //updatedAt: 'post_modified',
        tableName: 'manufacturer_languages',
        timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('manufacturer_languages', attributes, options);
}