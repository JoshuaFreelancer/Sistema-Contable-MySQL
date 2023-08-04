const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/usuarios.c');
const { obtenerUsuariosExceptoClave } = require('../models/usuarios.m');
const { verifyToken } = require('../tools/auth');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

// Ruta para el registro de usuarios
router.post('/register', validarDatosModelo('usuarios'), registrarUsuario);

// Ruta protegida para obtener todos los usuarios
router.get('/usuarios', authenticateUser, (req, res) => {
  try {
    // Verificar el JWT proporcionado por el cliente
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = verifyToken(token);

    // Obtener el ID y el rol del usuario que realizó la solicitud
    const { id, nombre, rol } = decodedToken;

    // Comprobar si el usuario tiene el rol adecuado para acceder a la información
    if (rol !== 'Facturador' && rol !== 'Contador' && rol !== 'Personal') {
      return res.status(403).json({ error: 'Acceso no autorizado.' });
    }

    // Obtener todos los usuarios almacenados excepto la columna "clave"
    obtenerUsuariosExceptoClave()
      .then((results) => {
        // Devolver la lista de usuarios en formato JSON
        res.json({ user: { id, nombre, rol }, usuarios: results });
        console.log('Haz obtenido la lista de usuarios registrados, usuario', nombre);
      })
      .catch((err) => {
        console.error('Error al obtener usuarios de la base de datos:', err);
        return res.status(500).json({ error: 'Error en el servidor.' });
      });
  } catch (error) {
    console.error('Error al verificar el JWT:', error);
    return res.status(401).json({ error: 'Token inválido o caducado.' });
  }
});

module.exports = router;
