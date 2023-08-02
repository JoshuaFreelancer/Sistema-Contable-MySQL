const express = require('express');
const router = express.Router();
const EmpleadosController = require('../controllers/empleados.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const empleadosController = new EmpleadosController();

// Rutas para empleados
router.get('/empleados', authenticateUser, empleadosController.listarEmpleados);
router.get('/empleados/:id', authenticateUser, empleadosController.obtenerEmpleado);
router.post('/empleados', authenticateUser, validarDatosModelo('empleados'), empleadosController.agregarEmpleado);
router.put('/empleados/:id', authenticateUser, validarDatosModelo('empleados'), empleadosController.editarEmpleado);
router.delete('/empleados/:id', authenticateUser, empleadosController.eliminarEmpleado);

module.exports = router;
