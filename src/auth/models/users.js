'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.SECRET || 'Kraby patty secret formula';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: { type: DataTypes.STRING, require: true },
    password: { type: DataTypes.STRING, require: true},
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), require: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });
  model.beforeCreate(async(user) => {
    let hashedPassword = await bcrypt.hash(user.password, 5);
    user.password = hashedPassword;
  });
  
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if(valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if(user) { return user; }
      throw new Error('User Not Found');
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  return model;
};

module.exports = userModel;