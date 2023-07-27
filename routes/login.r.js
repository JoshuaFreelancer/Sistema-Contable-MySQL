const express = require('express');
const loginController = require('../controllers/login.c');
const { verifyToken } = require('../tools/auth');

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', loginController.loginUser);

// Ruta protegida que requiere un JWT válido
router.get('/datos-protegidos', (req, res) => {
  try {
    // Verificar el JWT proporcionado por el cliente
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = verifyToken(token);

    // Si el JWT es válido, devolver los datos protegidos
    return res.json({ mensaje: 'Datos protegidos', usuario: decodedToken });
  } catch (error) {
    console.error('Error al verificar el JWT:', error);
    return res.status(401).json({ error: 'Token inválido o caducado.' });
  }
});

module.exports = router;


