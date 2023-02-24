'use strict';

const partsModel = (sequelize, DataTypes) => sequelize.define('Parts', {
  name: { type: DataTypes.STRING, required: true },
  quantity: { type: DataTypes.INTEGER, required: true },
  cost: { type: DataTypes.INTEGER, required: true },
});

module.exports = partsModel;