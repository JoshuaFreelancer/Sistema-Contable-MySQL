const connection = require('./conexion');

class Empleados {
  obtenerEmpleados() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM empleados', (error, rows) => {
        if (error) {
          console.error('Error al obtener los empleados:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerEmpleadoPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM empleados WHERE id = ?', [id], (error, rows) => {
        if (error) {
          console.error('Error al obtener el empleado por ID:', error);
          return reject(error);
        }
        resolve(rows[0]);
      });
    });
  }

  agregarEmpleado(empleado) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO empleados SET ?', [empleado], (error, result) => {
        if (error) {
          console.error('Error al agregar el empleado:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  editarEmpleado(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE empleados SET ? WHERE id = ?', [nuevaInformacion, id], (error, result) => {
        if (error) {
          console.error('Error al editar el empleado:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  eliminarEmpleado(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM empleados WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error('Error al eliminar el empleado:', error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

const empleados = new Empleados();

module.exports = { empleados };
