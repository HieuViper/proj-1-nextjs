import { DataTypes } from "sequelize";

export function tagsModel(sequelize) {
  const attributes = {
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
  };

  const options = {
    updatedAt: "tag_modified",
    tableName: "tags",
    timestamps: false,
    //indexes: [{ unique: true, fields: ['someUnique'] }],
  };

  return sequelize.define("tags", attributes, options);
}
