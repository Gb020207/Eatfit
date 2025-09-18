// Lista de palabras prohibidas
const forbiddenWords = ["palabra1", "palabra2", "discriminación"]; // reemplazar con reales

export const checkContent = (req, res, next) => {
  const { content } = req.body;
  const lowerContent = content.toLowerCase();

  const found = forbiddenWords.some(word => lowerContent.includes(word));

  if (found) {
    if (req.user.strikes >= 2) {
      return res.status(403).json({ message: 'Has alcanzado el límite de 3 advertencias. Tu cuenta está temporalmente bloqueada.' });
    }
    req.user.strikes += 1;
    return res.status(400).json({ message: `Contenido inapropiado detectado. Advertencia ${req.user.strikes}/3` });
  }

  next();
};
