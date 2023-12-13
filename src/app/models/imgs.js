
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Imgs = sequelize.define(
    'Imgs',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allownNull: false,
        },
        url: {
            type: DataTypes.STRING(200),
            unique: true,
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
        }
    },
    {
        tableName: 'imgs',
        timestamps: true,
    }
  );
//   Imgs.associate = function (models) {

//   };
  return Imgs;
};
