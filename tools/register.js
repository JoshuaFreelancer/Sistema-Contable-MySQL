const bcrypt = require('bcryptjs');
const connection = require('../models/conexion');

async function hashPassword(password) {
  return bcrypt.hash(password, 10); // Encriptar la contraseña con un salt de 10 rounds
}

async function registerUser(nombre, clave, rol) {
  try {
    // Verificar si el usuario ya existe en la base de datos
    connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], async (err, results) => {
      if (err) {
        throw new Error('Error al buscar usuario en la base de datos: ' + err.message);
      }

      const existingUser = results[0];

      if (existingUser) {
        throw new Error('El usuario ya está registrado. Por favor, ingrese uno diferente.');
      }

      // Encriptar la contraseña antes de guardarla en la base de datos
      const hashedPassword = await hashPassword(clave);

      // Registrar el nuevo usuario en la base de datos
      connection.query('INSERT INTO usuarios (nombre, clave, rol) VALUES (?, ?, ?)', [nombre, hashedPassword, rol], (err) => {
        if (err) {
          throw new Error('Error al registrar usuario en la base de datos: ' + err.message);
        }

        console.log('Usuario registrado exitosamente.');
      });
    });
  } catch (error) {
    throw new Error('Error en el registro de usuario: ' + error.message);
  }
}

module.exports = {
  registerUser,
  hashPassword,
};

