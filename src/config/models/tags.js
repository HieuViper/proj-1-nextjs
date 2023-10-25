import { DataTypes } from "sequelize";

export function tagsModel(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allownNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      defaultValue: "unknown",
      comment: "name of tag",
    },
    tag_code: {
      type: DataTypes.STRING(200),
      defaultValue: "unknown",
      comment: "code of tag",
    },
    description: {
      type: DataTypes.TEXT,
      collate: "utf8mb4_unicode_520_ci",
      comment: "Content of tag",
      allowNull: true,
      defaultValue: "undefined",
    },
  };

  const options = {
    updatedAt: "post_modified",
    tableName: "tags",
    //timestamps: false,
    //indexes: [{ unique: true, fields: ['someUnique'] }],
  };

  return sequelize.define("tags", attributes, options);
}
