
import { hashPassword, comparePassword} from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js"; 

export const register = async (req, res) => {
  const { name, email, password, age, role, strikes } = req.body;
  const hashed = await hashPassword(password);
  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: hashed,
      role,
      strikes,
      age,
    });
    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = generateToken({
      id: user.id,
      name: user.name,
      role: user.role,
      strikes: user.strikes
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ msg: "Login exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    }); 
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "Logout exitoso" }); 
};
