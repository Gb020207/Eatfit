import express from 'express';
import { saveDailyLog, getDailyLogs } from '../controllers/dailylog.controllers.js';
import { protect } from '../middleware/authmiddleware.js';

const routerLog = express.Router();

// Crear o actualizar registro diario
routerLog.post('/', protect, saveDailyLog);

// Obtener historial de registros
routerLog.get('/', protect, getDailyLogs);

export default routerLog;
