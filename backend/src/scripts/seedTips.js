import { sequelize } from '../config/db.js'; // tu conexión a MySQL
import { Tip } from '../models/tip.models.js'; // ajusta la ruta según tu proyecto


const tips = [
  { text: "Come frutas y verduras todos los días", category: "Alimentación" },
  { text: "Haz 30 minutos de ejercicio diario", category: "Salud" },
  { text: "Duerme al menos 7-8 horas cada noche", category: "Salud mental" },
  { text: "Bebe suficiente agua durante el día", category: "Hidratación" },
  { text: "Evita el exceso de azúcar y comida ultraprocesada", category: "Alimentación" }
];

export const seedTips = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión con MySQL exitosa ✅');

    // Opcional: limpiar la tabla antes de insertar
    await Tip.destroy({ where: {} });

    // Insertar los tips
    await Tip.bulkCreate(tips);

    console.log('Tips insertados correctamente ✅');
    process.exit(0);
  } catch (error) {
    console.error('Error insertando tips:', error);
    process.exit(1);
  }
};

  seedTips();
