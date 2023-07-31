const express = require('express');
const router = express.Router();
const ServiciosController = require('../controllers/servicios.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const serviciosController = new ServiciosController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Rutas para servicios
router.get('/servicios', authenticateUser, serviciosController.listarServicios);
router.get('/servicios/:id', authenticateUser, serviciosController.obtenerServicio);
router.post('/servicios', authenticateUser, validarDatosModelo('servicios'), serviciosController.agregarServicio);
router.put('/servicios/:id', authenticateUser, validarDatosModelo('servicios'), serviciosController.editarServicio);
router.delete('/servicios/:id', authenticateUser, serviciosController.eliminarServicio);

module.exports = router;
