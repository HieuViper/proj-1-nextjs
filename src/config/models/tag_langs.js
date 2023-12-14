
import { DataTypes } from "sequelize";

export function tagLangsModel(sequelize) {
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
        TagId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            references: {
                model: 'tags',
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
        tableName: 'tag_langs',
        timestamps: false,
    };

    return sequelize.define('tag_langs', attributes, options);
}