"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    "Cities",
    {
      name:DataTypes.STRING,
			code:DataTypes.STRING,
			countryId:DataTypes.INTEGER,
			order:DataTypes.INTEGER,
			active:DataTypes.BOOLEAN,
			
    },
    {tableName:"cities"}
  );
  Cities.associate = function (models) {
    //return
  };
  return Cities;
};