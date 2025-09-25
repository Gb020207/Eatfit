import { Tip }from '../models/tip.models.js';

// Middleware para validar que exista un tip de hoy
export const tipExists = async (req, res, next) => {
  try {
    const tipCount = await Tip.count();
    if (tipCount === 0) {
      return res.status(404).json({ message: "No hay tips disponibles" });
    }

    // Opcional: seleccionar un tip aleatorio y guardarlo en req
    const randomIndex = Math.floor(Math.random() * tipCount);
    const tip = await Tip.findAll({ offset: randomIndex, limit: 1 });
    req.tip = tip[0]; // guardamos el tip en la request
    next();
  } catch (error) {
    console.error("Error en tip middleware:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
