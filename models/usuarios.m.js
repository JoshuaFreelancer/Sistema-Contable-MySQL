const connection  = require('./conexion');

async function obtenerUsuariosExceptoClave() {
  return new Promise((resolve, reject) => {
    // Realizar la consulta para obtener todos los usuarios almacenados excepto la columna "clave"
    connection.query('SELECT id, nombre, rol FROM usuarios', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  obtenerUsuariosExceptoClave,
};
