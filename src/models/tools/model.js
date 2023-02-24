'use strict';

const toolModel = (sequelize, DataTypes) => sequelize.define('Tools', {
  brand: { type: DataTypes.STRING, required: true },
  color: { type: DataTypes.STRING, required: false },
  cost: { type: DataTypes.INTEGER, required: true },
});

module.exports = toolModel;