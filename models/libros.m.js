const connection = require('./conexion');

class Libros {
  obtenerLibros() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM libros', (error, rows) => {
        if (error) {
          console.error('Error al obtener los libros:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerLibroPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM libros WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el libro por ID:', error);
          return reject(error);
        }
        resolve(rows[0]);
      });
    });
  }

  agregarLibro(libro) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO libros SET ?', [libro], (error, result) => {
        if (error) {
          console.error('Error al agregar el libro:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarLibro(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE libros SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el libro:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarLibro(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM libros WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el libro:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const libros = new Libros();

module.exports = { libros };
