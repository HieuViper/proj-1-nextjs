
import { DataTypes } from "sequelize";

export function productsModel(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        product_code: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            unique: true,
            allowNull: false,
            comment: 'product code is used to build URL',
        },
        main_image: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'feature image of the products',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        sub_image1: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'feature image of the products',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        sub_image2: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'feature image of the products',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        sub_image3: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'feature image of the products',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        sub_image4: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'feature image of the products',
            references: {
                model: 'imgs',
                key: 'url'
            }
        },
        categories: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'default',
            //unique: '',
            //unique: true,
            //field: 'real name of the column',
            /*references: {
                model: BarProp,
                key: 'id'
            }*/
            comment: 'Categories has the format: category1, category2, category3',
        },
        manufacturerId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            comment: 'Id of the manufaturer',
            references: {
                model: 'manufacturers',
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            comment: 'Original price',
            allowNull: true,
        },
        discount_price: {
            type: DataTypes.DOUBLE,
            comment: 'Original price',
            allowNull: true,
        },

        product_author: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            comment: 'It contains username that is used to login',
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'You have to insert username of the post_author',
                }
            },
        },
        modified_by: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            comment: 'This one is not the author, he is the one modified the products',
        },
        product_position: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 0,
            comment: 'it has the value 1 that means the news is prioritied',
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
        tableName: 'products',
        //timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    };

    return sequelize.define('products', attributes, options);
}