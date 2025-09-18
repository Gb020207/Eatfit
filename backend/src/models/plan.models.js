import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Plan = sequelize.define('Plan', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  meals: {
    type: DataTypes.JSON, // Guardamos un JSON con las comidas
    allowNull: false
  },
  recommendedFor: {
    type: DataTypes.STRING, // Ejemplo: "bajar peso", "ganar masa"
    allowNull: false
  }
}, {
  tableName: 'plans',
  timestamps: true
});

