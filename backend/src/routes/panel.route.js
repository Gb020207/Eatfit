import { Router } from 'express';
import UserProgress from '../models/panel.model.js';

const routerPanel = Router();

// ✅ Obtener progreso de un usuario
routerPanel.get('/:userId', async (req, res) => {
  try {
    const progreso = await UserProgress.findOne({ where: { userId: req.params.userId } });

    if (!progreso) {
      return res.status(404).json({ message: 'Progreso no encontrado' });
    }

    res.json(progreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el progreso' });
  }
});

// ✅ Actualizar progreso del usuario
routerPanel.post('/:userId', async (req, res) => {
  try {
    const { frutas, agua, dietaCumplidos } = req.body;
    const userId = req.params.userId;

    let progreso = await UserProgress.findOne({ where: { userId } });

    if (!progreso) {
      progreso = await UserProgress.create({ userId, frutas, agua, dietaCumplidos });
    } else {
      progreso.frutas = frutas ?? progreso.frutas;
      progreso.agua = agua ?? progreso.agua;
      progreso.dietaCumplidos = dietaCumplidos ?? progreso.dietaCumplidos;
      await progreso.save();
    }

    res.json({ message: '✅ Progreso actualizado correctamente', progreso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Error al actualizar el progreso' });
  }
});

export default routerPanel;
