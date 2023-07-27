const connection = require('./conexion');

class Productos {
  obtenerProductos() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productos', (error, rows) => {
        if (error) {
          console.error('Error al obtener los productos:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerProductoPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productos WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el producto por ID:', error);
          return reject(error);
        }
          resolve(rows[0]);
      });
    });
  }

  agregarProducto(producto) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO productos SET ?', [producto], (error, result) => {
        if (error) {
          console.error('Error al agregar el producto:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarProducto(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE productos SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el producto:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarProducto(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM productos WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el producto:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const productos = new Productos();

module.exports = { productos };


  