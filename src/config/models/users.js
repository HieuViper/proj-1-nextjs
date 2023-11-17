
import { DataTypes } from "sequelize";

export function usersModel(sequelize) {
    const attributes = {
        username: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allownNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,

        },
        // salt: {
        //     type: DataTypes.STRING(200),
        //     allowNull: true,
        // },
        image: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'profile image of user',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        first_name: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
        },
        nick_name: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'You have to input nick name',
                }
            },
        },
        display_name: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        num_posts: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            defaultValue: 0,
            comment: 'number of news post this user have',
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                isNumeric: true,
            }
        },
        facebook_profile: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        instagram_profile: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        linkedin_profile: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        biographical: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        comment_status: {
            type: DataTypes.STRING(20),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
        },
        comment_count: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: 0,
        },
    };

    const options = {
        //updatedAt: 'post_modified',
        tableName: 'users',
        //timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('users', attributes, options);
}