const express = require('express');
const router = express.Router();
const HistorialController = require('../controllers/historial.c');
const { authenticateUser } = require('../tools/authMiddleware');

const historialController = new HistorialController();

// Obtener el historial de acciones
router.get('/historial', authenticateUser, historialController.obtenerHistorial);

module.exports = router;
