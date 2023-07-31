const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientes.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const clientesController = new ClientesController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

//Rutas para clientes
router.get('/clientes', authenticateUser, clientesController.listarClientes);
router.get('/clientes/:id', authenticateUser, clientesController.obtenerCliente);
router.post('/clientes', authenticateUser, validarDatosModelo('clientes'), clientesController.agregarCliente);
router.put('/clientes/:id', authenticateUser, validarDatosModelo('clientes'), clientesController.editarCliente);
router.delete('/clientes/:id', authenticateUser, clientesController.eliminarCliente);

module.exports = router;