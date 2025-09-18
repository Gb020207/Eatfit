import express from 'express';
import { generatePlan, getUserPlans } from '../controllers/plan.controllers.js';
import { protect } from '../middleware/authmiddleware.js';

const routerPlans = express.Router();

// Generar plan según cuestionario
routerPlans.post('/generate', protect, generatePlan);

// Obtener todos los planes del usuario
routerPlans.get('/my-plans', protect, getUserPlans);

export default routerPlans;
