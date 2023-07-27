const connection = require('./conexion');

class Espacios {
  obtenerEspacios() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM espacios', (error, rows) => {
        if (error) {
          console.error('Error al obtener los espacios:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerEspacioPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM espacios WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el espacio por ID:', error);
          return reject(error);
        }
          resolve(rows[0]);
      });
    });
  }

  agregarEspacio(espacio) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO espacios SET ?', [espacio], (error, result) => {
        if (error) {
          console.error('Error al agregar el espacio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarEspacio(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE espacios SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el espacio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarEspacio(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM espacios WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el espacio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const espacios = new Espacios();

module.exports = { espacios };

  