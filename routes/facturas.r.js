const express = require('express');
const router = express.Router();
const FacturasController = require('../controllers/facturas.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const facturasController = new FacturasController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Ruta para listar todas las facturas
router.get('/facturas', authenticateUser, facturasController.listarFacturas);

// Ruta para obtener una factura específica por su ID
router.get('/facturas/:id', authenticateUser, facturasController.obtenerFactura);

// Ruta para agregar una nueva factura
router.post('/facturas', authenticateUser, validarDatosModelo('facturas'), facturasController.agregarFactura);

// Ruta para editar una factura existente por su ID
router.put('/facturas/:id', authenticateUser, validarDatosModelo('facturas'), facturasController.editarFactura);

// Ruta para eliminar una factura por su ID
router.delete('/facturas/:id', authenticateUser, facturasController.eliminarFactura);

// Ruta para mostrar las facturas de un día en específico
router.get('/facturas/dia/:fecha', authenticateUser, facturasController.obtenerFacturasPorFecha);

// Ruta para buscar facturas por cliente
router.get('/facturas/cliente/:nombreCliente', authenticateUser, facturasController.obtenerFacturasPorCliente);

module.exports = router;
