const { historial } = require('../models/historial.m');

class HistorialController {
  async obtenerHistorial(req, res) {
    try {
      const historialAcciones = await historial.obtenerHistorial();
      res.json(historialAcciones);
    } catch (error) {
      console.error('Error al obtener el historial de acciones:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el historial de acciones.' });
    }
  }
}

module.exports = HistorialController;
