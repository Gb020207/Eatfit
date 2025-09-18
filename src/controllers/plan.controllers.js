import { Plan } from "../models/plan.models.js";



export const generatePlan = async (req, res) => {
  try {
    const { goal, preferences, weight, height, age } = req.body;

    let title = '';
    let description = '';
    let meals = [];

    // Lógica básica: ajustaremos más adelante
    if (goal === 'bajar_peso') {
      title = 'Plan para Bajar de Peso';
      description = 'Este plan te ayudará a perder grasa de manera saludable.';
      meals = [
        { name: 'Desayuno', time: '08:00', portion: 'Avena + frutas', suggestions: 'Sin azúcar' },
        { name: 'Almuerzo', time: '12:30', portion: 'Pollo + ensalada', suggestions: 'Poca sal' },
        { name: 'Cena', time: '20:00', portion: 'Pescado + verduras', suggestions: 'Sin frituras' }
      ];
    } else if (goal === 'ganar_masa') {
      title = 'Plan para Ganar Masa Muscular';
      description = 'Este plan te ayudará a aumentar tu masa muscular.';
      meals = [
        { name: 'Desayuno', time: '08:00', portion: 'Huevos + avena', suggestions: 'Agrega leche descremada' },
        { name: 'Almuerzo', time: '13:00', portion: 'Carne + arroz integral', suggestions: 'Porción grande' },
        { name: 'Cena', time: '21:00', portion: 'Pechuga + batata', suggestions: 'Evita frituras' }
      ];
    } else {
      title = 'Plan Saludable General';
      description = 'Este plan te ayuda a mantener hábitos saludables.';
      meals = [
        { name: 'Desayuno', time: '07:30', portion: 'Yogurt + frutas', suggestions: 'Evita azúcar refinada' },
        { name: 'Almuerzo', time: '12:00', portion: 'Pescado + arroz integral', suggestions: 'Incluye verduras' },
        { name: 'Cena', time: '19:30', portion: 'Sopa de verduras', suggestions: 'No consumir snacks después' }
      ];
    }

    const plan = await Plan.create({
      userId: req.user.id,
      title,
      description,
      meals,
      recommendedFor: goal
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el plan', error: error.message });
  }
};
export const getUserPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({ where: { userId: req.user.id } });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener planes', error: error.message });
  }
};

