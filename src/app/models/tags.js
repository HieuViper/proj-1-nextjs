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
    Tags.belongsToMany(db.Languages, { through: db.Tag_langs });
    db.Languages.belongsToMany(Tags, { through: db.Tag_langs });
  };
  return Tags;
};
