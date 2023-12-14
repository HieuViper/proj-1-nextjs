import { DataTypes } from "sequelize";

export function productTransportModel(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allownNull: false,
    },
    transport: {
      type: DataTypes.TEXT,    //format: imgKey~Transport description 1, imgKey get from table Icons
      allowNull: false,
      validate: {
        notNull: {
          msg: "You have to insert transport description",
        },
      },
      comment: "Transport description",
    },
    LanguageCode: {
      type: DataTypes.STRING(10),
     // primaryKey: true,
      references: {
          model: 'languages',
          key: 'code'
      }
  }
  };

  const options = {
    //updatedAt: "tag_modified",
    tableName: "product_transport",
    timestamps: false,
    //indexes: [{ unique: true, fields: ['someUnique'] }],
  };

  return sequelize.define("product_transport", attributes, options);
}
