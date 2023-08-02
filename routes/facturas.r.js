const express = require('express');
const router = express.Router();
const FacturasController = require('../controllers/facturas.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const facturasController = new FacturasController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Rutas para facturas
router.get('/facturas', authenticateUser, facturasController.listarFacturas);
router.get('/facturas/:id', authenticateUser, facturasController.obtenerFactura);
router.post('/facturas', authenticateUser, validarDatosModelo('facturas'), facturasController.agregarFactura);
router.put('/facturas/:id', authenticateUser, validarDatosModelo('facturas'), facturasController.editarFactura);
router.delete('/facturas/:id', authenticateUser, facturasController.eliminarFactura);
router.get('/facturas/dia/:fecha', authenticateUser, facturasController.obtenerFacturasPorFecha);
router.get('/facturas/cliente/:nombreCliente', authenticateUser, facturasController.obtenerFacturasPorCliente);

module.exports = router;
