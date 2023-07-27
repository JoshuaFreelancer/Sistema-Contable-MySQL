const express = require('express');
const router = express.Router();
const CuentasController = require('../controllers/cuentas.c');
const { authenticateUser } = require('../tools/authMiddleware');

const cuentasController = new CuentasController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Ruta para listar todas las cuentas
router.get('/cuentas', authenticateUser, cuentasController.listarCuentas);

// Ruta para obtener una cuenta específica por su ID
router.get('/cuentas/:id', authenticateUser, cuentasController.obtenerCuenta);

// Ruta para agregar una nueva cuenta
router.post('/cuentas', authenticateUser, cuentasController.agregarCuenta);

// Ruta para editar una cuenta existente por su ID
router.put('/cuentas/:id', authenticateUser, cuentasController.editarCuenta);

// Ruta para eliminar una cuenta por su ID
router.delete('/cuentas/:id', authenticateUser, cuentasController.eliminarCuenta);

// Nuevo endpoint para eliminar cuentas por estado
router.delete('/cuentas/estado/:estado', authenticateUser, cuentasController.eliminarCuentasPorEstado);

// Ruta para filtrar cuentas por estado
router.get('/cuentas/estado/:estado', authenticateUser, cuentasController.obtenerCuentasPorEstado);

module.exports = router;


