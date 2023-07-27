const connection = require('./conexion');
var conexion = connection;

class Cuentas {
  obtenerCuentas() {
    return new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM cuentas', (error, rows) => {
        if (error) {
          console.error('Error al obtener las cuentas:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerCuentaPorId(id) {
    return new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM cuentas WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener la cuenta por ID:', error);
          return reject(error);
        }
        resolve(rows[0]);
      });
    });
  }

  agregarCuenta(cuenta) {
    return new Promise((resolve, reject) => {
      conexion.query('INSERT INTO cuentas SET ?', [cuenta], (error, result) => {
        if (error) {
          console.error('Error al agregar la cuenta:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarCuenta(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      conexion.query('UPDATE cuentas SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar la cuenta:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarCuenta(id) {
    return new Promise((resolve, reject) => {
      conexion.query('DELETE FROM cuentas WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar la cuenta:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  obtenerCuentasPorEstado(estado) {
    return new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM cuentas WHERE estado = ?', [estado], (error, rows) => {
        if (error) {
          console.error('Error al obtener las cuentas por estado:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  eliminarCuentasPorEstado(estado) {
    return new Promise((resolve, reject) => {
      conexion.query('DELETE FROM cuentas WHERE estado = ?', [estado], (error, result) => {
        if (error) {
          console.error('Error al eliminar las cuentas por estado:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const cuentas = new Cuentas();

module.exports = { cuentas };




  
  
  