const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/libros.c');
const { authenticateUser } = require('../tools/authMiddleware');
const { validarDatosModelo } = require('../tools/validation');

const librosController = new LibrosController();

// Aplicar el middleware de autenticación a todas las rutas relacionadas con libros

// Rutas para libros
router.get('/libros', authenticateUser, librosController.listarLibros);
router.get('/libros/:id', authenticateUser, librosController.obtenerLibro);
router.post('/libros', authenticateUser, validarDatosModelo('libros'), librosController.agregarLibro);
router.put('/libros/:id', authenticateUser, validarDatosModelo('libros'), librosController.editarLibro);
router.delete('/libros/:id', authenticateUser, librosController.eliminarLibro);

module.exports = router;
