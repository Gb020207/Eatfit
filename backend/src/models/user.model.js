import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Plan } from './plan.models.js';

export const UserModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  strikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'users',
  timestamps: true
});


User.hasMany(Plan, { foreignKey: 'userId' });
Plan.belongsTo(User, { foreignKey: 'userId' });
