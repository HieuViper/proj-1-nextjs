'use strict';
module.exports = (sequelize, DataTypes) => {
  const Languages = sequelize.define(
    'Languages',
    {
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
    },
    {
      tableName: 'languages',
      timestamps: false,
    }
  );
  Languages.associate = function (db) {
    // associations can be defined here
  };
  return Languages;
};
