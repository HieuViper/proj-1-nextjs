"use strict";
module.exports = (sequelize, DataTypes) => {
  const Districts = sequelize.define(
    "Districts",
    {
      name:DataTypes.STRING,
			code:DataTypes.STRING,
			cityId:DataTypes.INTEGER,
			order:DataTypes.INTEGER,
			active:DataTypes.BOOLEAN,
			
    },
    {tableName:"districts"}
  );
  Districts.associate = function (models) {
    //return
  };
  return Districts;
};