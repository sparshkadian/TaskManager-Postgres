import Sequelize from 'sequelize';
import { dbConfig } from './db.config.js';
import { userModel } from '../models/user.model.js';
import { taskModel } from '../models/task.model.js';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.userName,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

export const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = userModel(sequelize, Sequelize);
db.task = taskModel(sequelize, Sequelize);

db.user.hasMany(db.task);
db.task.belongsTo(db.user);
