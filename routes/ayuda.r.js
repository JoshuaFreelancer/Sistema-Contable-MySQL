const express = require('express');
const router = express.Router();

// Importar el controlador para mostrar la página de ayuda
const ayudaController = require('../controllers/ayuda.c');

// Ruta para la página de ayuda
router.get('/ayuda', ayudaController.mostrarAyuda);

module.exports = router;
