
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
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
        },
        sub_image: {
            type: DataTypes.TEXT,  //form: [{url: 'url', alt: 'alt', caption: 'caption'},{},{}]  Nhờ anh Cảnh coi lại chổ này
            get: function() {
                const result = this.getDataValue("sub_image").split(';').map( ( item ) => {
                    return JSON.parse( item );
                })
                return result;
            },
            set: function(value) {
                const result = value.map( ( item ) => {
                    return JSON.stringify( item );
                });

                return this.setDataValue("sub_image", result.join(';'));
            },
            allowNull: true,
            comment: 'feature image of the products',
        },
        categories: {
            type: DataTypes.STRING(200),
            collate: 'utf8mb4_unicode_520_ci',
            allowNull: true,
            defaultValue: 'default',

            comment: 'Categories has the format: category1, category2, category3',
        },
        // manufacturerId: {
        //     type: DataTypes.BIGINT(20).UNSIGNED,
        //     comment: 'Id of the manufaturer',
        //     // references: {
        //     //     model: 'manufacturers',
        //     //     key: 'id',
        //     //     onDelete: 'CASCADE',
        //     //     onUpdate: 'CASCADE',
        //     // }
        // },
        isWarranty: DataTypes.BOOLEAN,
        warrantyDay: DataTypes.INTEGER,
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
    },
    {tableName: 'products'}
  );
  Products.associate = function (db) {
    // associations can be defined here
    Products.belongsToMany(db.Languages, { through: db.Product_languages });
    db.Languages.belongsToMany(Products, { through: db.Product_languages });
    db.Manufacturers.hasMany(Products, {
        as: 'products',
        foreignKey: 'manufacturerId',
      });
  };
  return Products;
};

