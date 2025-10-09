import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const UserProgress = sequelize.define('UserProgress', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  frutas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  frutasMeta: {
    type: DataTypes.INTEGER,
    defaultValue: 7
  },
  agua: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  aguaMeta: {
    type: DataTypes.FLOAT,
    defaultValue: 3
  },
  dietaCumplidos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dietaMeta: {
    type: DataTypes.INTEGER,
    defaultValue: 7
  }
});

export default UserProgress;
