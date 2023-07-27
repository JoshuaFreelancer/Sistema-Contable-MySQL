const connection = require('../models/conexion');

async function getUserByName(nombre) {
  try {
    return new Promise((resolve, reject) => {
      // Realizar la consulta para obtener al usuario por el nombre
      connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, results) => {
        if (err) {
          console.error('Error al buscar usuario en la base de datos:', err);
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  } catch (error) {
    throw new Error('Error al obtener al usuario de la base de datos: ' + error.message);
  }
}

module.exports = {
  getUserByName,
};
