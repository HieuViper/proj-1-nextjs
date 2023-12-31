('use strict');
module.exports = (sequelize, DataTypes) => {
  const Manufacturers = sequelize.define(
    'Manufacturers',
    {
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


    },
    {tableName: 'manufacturers'}
  );
  Manufacturers.associate = function (db) {
    // associations can be defined here
    Manufacturers.hasMany(db.Manufacturer_languages, {
        as: 'manufacturer_languages',
        foreignKey: 'manufacturerId',
      });
    db.Manufacturer_languages.belongsTo(Manufacturers, {
        as: 'manufacturers',
        foreignKey: "manufacturerId",
    });
    //manufacturer
    db.Languages.hasMany(db.Manufacturer_languages, {
      as: 'manufacturer_languages',
      foreignKey: "languageCode",
    });
    db.Manufacturer_languages.belongsTo(db.Languages, {
          as: 'languages',
          foreignKey: "languageCode",
    });

    db.Manufacturers.hasMany(db.Products, {
        as: 'products',
        foreignKey: 'manufacturerId',
      });
    db.Products.belongsTo(db.Manufacturers, {
    as: 'manufacturers',
    foreignKey: 'manufacturerId',
    });
  };
  return Manufacturers;
};

