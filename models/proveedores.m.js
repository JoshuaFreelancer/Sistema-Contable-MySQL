const connection = require('./conexion');

class Proveedor {
    obtenerProveedores() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM proveedores', (error, rows) => {
          if (error) {
            console.error('Error al obtener los proveedores:', error);
            return reject(error);
          }
          resolve(rows);
        });
      });
    }
  
    obtenerProveedorPorId(id) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM proveedores WHERE id = ?', [id], (error, rows) => {
          if (error) {
            console.error('Error al obtener el proveedor por ID:', error);
            return reject(error);
          }
            resolve(rows[0]);
        });
      });
    }
  
    agregarProveedor(proveedor) {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO proveedores SET ?', [proveedor], (error, result) => {
          if (error) {
            console.error('Error al agregar el proveedor:', error);
            return reject(error);
          }
          resolve(result);
        });
      });
    }
  
    editarProveedor(id, nuevaInformacion) {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE proveedores SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
          if (error) {
            console.error('Error al editar el proveedor:', error);
            return reject(error);
          }
          resolve(result);
        });
      });
    }
  
    eliminarProveedor(id) {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM proveedores WHERE id = ?', [id], (error, result) => {
          if (error) {
            console.error('Error al eliminar el proveedor:', error);
            return reject(error);
          }
          resolve(result);
        });
      });
    }
  }

const proveedores = new Proveedor();

module.exports = { proveedores };