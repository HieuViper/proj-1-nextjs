"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "Customers",
    {
      title:DataTypes.STRING,
			name:DataTypes.STRING,
			address:DataTypes.STRING,
			phone:DataTypes.STRING,
			email:DataTypes.STRING,
			districtId:DataTypes.INTEGER,
    },
    {tableName:"customers"}
  );
  Customers.associate = function (models) {
    //return
  };
  return Customers;
};