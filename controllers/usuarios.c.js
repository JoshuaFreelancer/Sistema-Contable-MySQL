const { registerUser } = require('../tools/register');
const connection  = require('../models/conexion');

async function registrarUsuario(req, res) {
  try {
    const { nombre, clave, rol } = req.body;

    if (!nombre || !clave || !rol) {
      return res.status(400).json({ error: 'Nombre, clave y rol son campos obligatorios.' });
    }

    // Verificar si el usuario ya existe en la base de datos
    connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], async (err, results) => {
      if (err) {
        console.error('Error al buscar usuario en la base de datos:', err);
        return res.status(500).json({ error: 'Error en el servidor.' });
      }

      const existingUser = results[0];

      if (existingUser) {
        return res.status(409).json({ error: 'El usuario ya está registrado. Por favor, ingrese uno diferente.' });
      }

      // Registrar el usuario utilizando la función register
      await registerUser(nombre, clave, rol);

      return res.json({ message: 'Usuario registrado exitosamente.' });
    });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registrarUsuario,
};
