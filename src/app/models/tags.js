('use strict');
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    'Tags',
    {
      id: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allownNull: false,
      },
      tag_code: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: "You have to insert tag code",
          },
        },
        comment: "code of tag",
      },
    },
    {
      //updatedAt: "tag_modified",
      tableName: "tags",
      timestamps: false,
      //indexes: [{ unique: true, fields: ['someUnique'] }],
    }
  );
  Tags.associate = function (db) {
    // associations can be defined here
    Tags.hasMany(db.Tag_langs, {
      as: 'tag_langs',
      foreignKey: 'tagId',
    });
    db.Tag_langs.belongsTo(Tags, {
        as: 'tags',
        foreignKey: "tagId",
    });
  };
  return Tags;
};
