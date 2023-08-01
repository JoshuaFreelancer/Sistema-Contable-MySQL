const express = require('express');
const router = express.Router();
const AlmacenController = require('../controllers/almacen.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const almacenController = new AlmacenController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con el almacén

// Rutas para productos en almacén
router.get('/almacen', authenticateUser, almacenController.listarProductosEnAlmacen);
router.get('/almacen/:id', authenticateUser, almacenController.obtenerProductoEnAlmacenPorId);
router.post('/almacen', authenticateUser, validarDatosModelo('almacen'), almacenController.agregarProductoEnAlmacen);
router.put('/almacen/:id', authenticateUser, validarDatosModelo('almacen'), almacenController.editarProductoEnAlmacen);
router.delete('/almacen/:id', authenticateUser, almacenController.eliminarProductoEnAlmacen);

module.exports = router;

