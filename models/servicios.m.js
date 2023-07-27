const connection = require('./conexion');

class Servicios {
  obtenerServicios() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM servicios', (error, rows) => {
        if (error) {
          console.error('Error al obtener los servicios:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerServicioPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM servicios WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el servicio por ID:', error);
          return reject(error);
        }
          resolve(rows[0]);
      });
    });
  }

  agregarServicio(servicio) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO servicios SET ?', [servicio], (error, result) => {
        if (error) {
          console.error('Error al agregar el servicio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarServicio(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE servicios SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el servicio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarServicio(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM servicios WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el servicio:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const servicios = new Servicios();

module.exports = { servicios };
