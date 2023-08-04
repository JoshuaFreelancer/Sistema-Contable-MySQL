const connection = require('../models/conexion');

class Historial {
  obtenerHistorial() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM historial_acciones', (error, rows) => {
        if (error) {
          console.error('Error al obtener el historial de acciones:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }
}

const historial = new Historial();

module.exports = { historial };
