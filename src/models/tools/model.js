'use strict';

const toolModel = (sequelize, DataTypes) => sequelize.define('Tools', {
  brand: { type: DataTypes.ENUM('CRAFTSMAN', 'DEWALT', 'Bosch', 'Makita', 'Milwaukee'), required: true },
  color: { type: DataTypes.STRING, required: false },
  cost: { type: DataTypes.INTEGER, required: true },
});

module.exports = toolModel;