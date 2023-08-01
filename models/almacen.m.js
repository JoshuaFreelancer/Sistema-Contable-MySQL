const connection = require('./conexion');

class Almacen {
  obtenerProductosEnAlmacen() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM almacen', (error, rows) => {
        if (error) {
          console.error('Error al obtener los productos en el almacén:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerProductoEnAlmacenPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM almacen WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el producto en el almacén por ID:', error);
          return reject(error);
        }
        resolve(rows[0]);
      });
    });
  }

  agregarProductoEnAlmacen(producto) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO almacen SET ?', [producto], (error, result) => {
        if (error) {
          console.error('Error al agregar el producto en el almacén:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarProductoEnAlmacen(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE almacen SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el producto en el almacén:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarProductoEnAlmacen(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM almacen WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el producto en el almacén:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const almacen = new Almacen();

module.exports = { almacen };
