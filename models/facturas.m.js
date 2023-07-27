const connection = require('./conexion');

class Facturas {
  obtenerFacturas() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM facturas', (error, rows) => {
        if (error) {
          console.error('Error al obtener las facturas:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  }

  obtenerFacturaPorId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM facturas WHERE id = ?',[id], (error, rows) => {
          if (error) {
            console.error('Error al obtener la factura por ID:', error);
            return reject(error);
          }
            resolve(rows[0]);
        }
      );
    });
  }

  agregarFactura(factura) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO facturas SET ?',[factura], (error, result) => {
          if (error) {
            console.error('Error al agregar la factura:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  }

  editarFactura(id, nuevaInformacion) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE facturas SET ? WHERE id = ?',
        [nuevaInformacion, id],
        (error, result) => {
          if (error) {
            console.error('Error al editar la factura:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  }

  eliminarFactura(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM facturas WHERE id = ?',
        [id],
        (error, result) => {
          if (error) {
            console.error('Error al eliminar la factura:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  }

  obtenerFacturasPorFecha(fecha) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM facturas WHERE fecha = ?',
        [fecha],
        (error, rows) => {
          if (error) {
            console.error('Error al obtener las facturas por fecha:', error);
            return reject(error);
          }
          resolve(rows);
        }
      );
    });
  }

  obtenerFacturasPorCliente(nombreCliente) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM facturas WHERE cliente = ?',
        [nombreCliente],
        (error, rows) => {
          if (error) {
            console.error('Error al obtener las facturas por cliente:', error);
            return reject(error);
          }
          resolve(rows);
        }
      );
    });
  }
}

const facturas = new Facturas();

module.exports = { facturas };

  