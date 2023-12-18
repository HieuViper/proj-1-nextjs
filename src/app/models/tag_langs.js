('use strict');
module.exports = (sequelize, DataTypes) => {
  const Tag_langs = sequelize.define(
    'Tag_langs',
    {
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
    },
    {
        tableName: 'tag_langs',
        timestamps: false,
    }
  );
//   Tag_langs.associate = function (db) {
//     // associations can be defined here
//   };
  return Tag_langs;
};
