import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models.js';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age , plan} = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
       plan: plan || "free" // default
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
       // 👉 aquí añadimos el plan del usuario en la respuesta
      plan: user.plan  // <-- importante
      
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};
export const getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findByPk(id); // req.user.id viene del token
    res.json(user);
  } catch (error) {
    console.log(error),
    res.status(500).json({ message: 'Error obteniendo usuario', error: error.message });
  }
  
}