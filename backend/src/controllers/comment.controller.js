import Comment from "../models/comment.model.js";



// Obtener todos los comentarios
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ order: [["createdAt", "DESC"]] });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

// Crear un comentario nuevo
export const createComment = async (req, res) => {
  const { userName, text } = req.body;
  try {
    const newComment = await Comment.create({ userName, text });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear comentario" });
  }
};
