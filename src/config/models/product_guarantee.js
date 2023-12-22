import { DataTypes } from "sequelize";

export function productGuaranteeModel(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allownNull: false,
    },
    guarantee: {
      type: DataTypes.TEXT,    //format: imgKey~Guarantee description 1, imgKey get from table Icons
      allowNull: false,
      validate: {
        notNull: {
          msg: "You have to insert guarantee",
        },
      },
      comment: "Guarantee description",
    },
    languageCode: {
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
    tableName: "product_guarantee",
    timestamps: false,
    //indexes: [{ unique: true, fields: ['someUnique'] }],
  };

  return sequelize.define("product_guarantee", attributes, options);
}
