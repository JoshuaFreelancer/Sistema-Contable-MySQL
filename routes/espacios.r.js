const express = require('express');
const router = express.Router();
const EspaciosController = require('../controllers/espacios.c');
const { authenticateUser } = require('../tools/authMiddleware');

const espaciosController = new EspaciosController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

router.get('/espacios', authenticateUser, espaciosController.listarEspacios);
router.get('/espacios/:id', authenticateUser, espaciosController.obtenerEspacio);
router.post('/espacios', authenticateUser, espaciosController.agregarEspacio);
router.put('/espacios/:id', authenticateUser, espaciosController.editarEspacio);
router.delete('/espacios/:id', authenticateUser, espaciosController.eliminarEspacio);

module.exports = router;
