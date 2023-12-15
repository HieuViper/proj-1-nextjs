
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Manufacturer_languages = sequelize.define(
    'Manufacturer_languages',
    {
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
    },
    {
        //updatedAt: 'post_modified',
        tableName: 'manufacturer_languages',
        timestamps: false,
        //indexes: [{ unique: true, fields: ['someUnique'] }],
    }
  );
  Manufacturer_languages.associate = function (db) {
    // associations can be defined here

  };
  return Manufacturer_languages;
};
