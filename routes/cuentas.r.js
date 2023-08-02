const express = require('express');
const router = express.Router();
const CuentasController = require('../controllers/cuentas.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const cuentasController = new CuentasController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Rutas para cuentas
router.get('/cuentas', authenticateUser, cuentasController.listarCuentas);
router.get('/cuentas/:id', authenticateUser, cuentasController.obtenerCuenta);
router.post('/cuentas', authenticateUser, validarDatosModelo('cuentas'), cuentasController.agregarCuenta);
router.put('/cuentas/:id', authenticateUser, validarDatosModelo('cuentas'), cuentasController.editarCuenta);
router.delete('/cuentas/:id', authenticateUser, cuentasController.eliminarCuenta);
router.delete('/cuentas/estado/:estado', authenticateUser, cuentasController.eliminarCuentasPorEstado);
router.get('/cuentas/estado/:estado', authenticateUser, cuentasController.obtenerCuentasPorEstado);

module.exports = router;


