const express = require('express');
const router = express.Router();
const ProveedoresController = require('../controllers/proveedores.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const proveedoresController = new ProveedoresController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

//Rutas para proveedores
router.get('/proveedores', authenticateUser, proveedoresController.listarProveedores);
router.get('/proveedores/:id', authenticateUser, proveedoresController.obtenerProveedor);
router.post('/proveedores', authenticateUser, validarDatosModelo('proveedores'), proveedoresController.agregarProveedor);
router.put('/proveedores/:id', authenticateUser, validarDatosModelo('proveedores'), proveedoresController.editarProveedor);
router.delete('/proveedores/:id', authenticateUser, proveedoresController.eliminarProveedor);

module.exports = router;