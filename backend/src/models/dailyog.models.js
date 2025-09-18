import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './user.models.js';

export const DailyLog = sequelize.define('DailyLog', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  meals: {
    type: DataTypes.JSON,
    allowNull: false
  },
  water: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exercise: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sleep: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'daily_logs',
  timestamps: true
});

// Relación con Usuario
User.hasMany(DailyLog, { foreignKey: 'userId' });
DailyLog.belongsTo(User, { foreignKey: 'userId' });
