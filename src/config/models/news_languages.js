
import { DataTypes } from "sequelize";

export function newsLanguageModel(sequelize) {
    const attributes = {
        // news_id: {
        //     type: DataTypes.BIGINT(20).UNSIGNED,
        //     allownNull: false,
        //     //primaryKey: true,
        //    /*references: {
        //         model: 'news',
        //         key: 'id'
        //     }*/
        // },
        title: {
            type: DataTypes.STRING(300),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'undefined',
            //unique: '',
            //unique: true,
            //field: 'real name of the column',
            /*references: {
                model: BarProp,
                key: 'id'
            }*/
            comment: 'Title can be null',
        },
        excerpt: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'Short Description',
        },
        content: {
            type: DataTypes.TEXT,
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'Content of News',
            allowNull: true,
            defaultValue: 'undefined',
        },
        NewsId: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            references: {
                model: 'news', // 'Movies' would also work
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
        // language_code: {
        //     type: DataTypes.STRING(10),
        //     collate: 'utf8mb4_unicode_520_ci',
        //     allowNull: false,
        //     //primaryKey: true,
        //    /* references: {
        //         model: 'languages',
        //         key: 'code'
        //     }*/
        // },
    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'news_languages',
        timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('news_languages', attributes, options);
}