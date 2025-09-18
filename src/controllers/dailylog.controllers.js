import { DailyLog } from '../models/dailyog.models.js';
import { Op } from 'sequelize';

// Crear o actualizar registro diario
export const saveDailyLog = async (req, res) => {
  try {
    const { date, meals, water, exercise, sleep } = req.body;

    // Validaciones básicas
    if (!date || !meals || !water || !exercise || !sleep) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Revisar si ya existe un registro para la fecha
    let log = await DailyLog.findOne({
      where: { userId: req.user.id, date }
    });

    if (log) {
      // Actualizar
      log.meals = meals;
      log.water = water;
      log.exercise = exercise;
      log.sleep = sleep;
      await log.save();
      return res.json(log);
    }

    // Crear nuevo registro
    log = await DailyLog.create({
      userId: req.user.id,
      date,
      meals,
      water,
      exercise,
      sleep
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando el registro', error: error.message });
  }
};

// Obtener historial
export const getDailyLogs = async (req, res) => {
  try {
    const logs = await DailyLog.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']]
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo historial', error: error.message });
  }
};
