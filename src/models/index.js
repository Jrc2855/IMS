'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const toolModel = require('./tools/model.js');
const partsModel = require('./parts/model.js');
const Collection = require('./data-collection');
const userModel = require('../auth/models/users.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

// let options = process.env.NODE_ENV === 'production' ? {
//   dialectOptions: {
//     ssl: true,
//     rejectUnauthorized: false,
//   },
// } : {};
// const sequelize = new Sequelize(`postgres://localhost:5432/IMS`, options);


const tools = toolModel(sequelize, DataTypes);
const parts = partsModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  tools: new Collection(tools),
  parts: new Collection(parts),
  users: userModel(sequelize, DataTypes),
};