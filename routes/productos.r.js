const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.c');
const { authenticateUser } = require('../tools/authMiddleware');

const productosController = new ProductosController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con cuentas

// Rutas para productos
router.get('/productos', authenticateUser, productosController.listarProductos);
router.get('/productos/:id', authenticateUser, productosController.obtenerProducto);
router.post('/productos', authenticateUser, productosController.agregarProducto);
router.put('/productos/:id', authenticateUser, productosController.editarProducto);
router.delete('/productos/:id', authenticateUser, productosController.eliminarProducto);

module.exports = router;
