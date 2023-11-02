
import { DataTypes } from "sequelize";

export function languagesModel(sequelize) {
    const attributes = {
        code: {
            type: DataTypes.STRING(10),
            collate: 'utf8mb4_unicode_520_ci',
            allownNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'You have to insert name of the language',
                }
            },
            //unique: '',
            //unique: true,
            //field: 'real name of the column',
            /*references: {
                model: BarProp,
                key: 'id'
            }*/
            //comment: 'Categories has the format: category1, category2, category3',
        },
        description: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Short Description',
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Active language',
        },
    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'languages',
        timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('languages', attributes, options);
}