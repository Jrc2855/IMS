'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const toolModel = require('./tools/model.js');
const partsModel = require('./parts/model.js');
const { Collection } = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const tools = toolModel(sequelize, DataTypes);
const parts = partsModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  tools: new Collection(tools),
  parts: new Collection(parts),
};