const connection = require('./conexion');

class Clientes {
  obtenerClientes() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM clientes', (error, rows) => {
        if (error) {
          console.error('Error al obtener los clientes:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerClientePorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM clientes WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el cliente por ID:', error);
          return reject(error);
        }
          resolve(rows[0]);
      });
    });
  }

  agregarCliente(cliente) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO clientes SET ?', [cliente], (error, result) => {
        if (error) {
          console.error('Error al agregar el cliente:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarCliente(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE clientes SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el cliente:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarCliente(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM clientes WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el cliente:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const clientes = new Clientes();

module.exports = { clientes };