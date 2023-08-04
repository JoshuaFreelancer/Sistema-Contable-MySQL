const connection = require('../models/conexion');

async function registrarAccion(req, tipo_consulta) {
  try {
    const { id } = req.user; // Asumiendo que el id del usuario está en req.user.id
    const { method, originalUrl } = req;

    const consulta = {
      usuario_id: id,
      ruta: originalUrl,
      tipo_consulta: method,
      fecha_hora: new Date(),
    };

    // Guardar la acción en la tabla historial_acciones
    await connection.query('INSERT INTO historial_acciones SET ?', consulta);

    console.log('Acción registrada en el historial:', consulta);
  } catch (error) {
    console.error('Error al registrar la acción en el historial:', error);
  }
}

module.exports = { registrarAccion };
