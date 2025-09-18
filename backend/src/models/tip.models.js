import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './user.models.js';
export const Tip = sequelize.define('Tip', {
  text: {
    type: DataTypes.STRING(300),
    allowNull: false,
    validate: { len: [1, 200] }
  },
  category: {
    type: DataTypes.ENUM('alimentación', 'hidratación', 'ejercicio', 'descanso'),
    allowNull: false
  }
}, {
  tableName: 'tips',
  timestamps: true
});
// suponiendo que User y Tip están importados correctamente
User.belongsToMany(Tip, { through: 'user_favorites', foreignKey: 'userId', otherKey: 'tipId' });
Tip.belongsToMany(User, { through: 'user_favorites', foreignKey: 'tipId', otherKey: 'userId' });
