const { generateToken, comparePasswords } = require('../tools/auth');
const usuariosModel = require('../models/login.m');

async function loginUser(req, res) {
  try {
    const { nombre, clave, rol } = req.body;

    if (!nombre || !clave || !rol) {
      return res.status(400).json({ error: 'Nombre, clave y rol son campos obligatorios.' });
    }

    // Buscar al usuario en la base de datos por el nombre
    const user = await usuariosModel.getUserByName(nombre);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar si el rol del usuario coincide con el rol proporcionado en la solicitud
    if (user.rol !== rol) {
      return res.status(401).json({ error: 'Rol de usuario incorrecto.' });
    }

    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
    const isPasswordMatch = await comparePasswords(clave, user.clave);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Generar un JWT y enviarlo al cliente
    const token = generateToken(user);

    // Definir los endpoints limitados por tipo de usuario
    let endpointsLimitados = [];
    if (user.rol === 'Contador') {
      endpointsLimitados = ['cuentas', 'clientes', 'proveedores', 'almacen', 'libros', 'empleados'];
    } else if (user.rol === 'Facturador') {
      endpointsLimitados = ['productos', 'servicios', 'facturas', 'espacios'];
    } else if (user.rol === 'Personal') {
      endpointsLimitados = ['productos', 'servicios', 'espacios', 'empleados'];
    }

    // Mensaje de acuerdo al rol del usuario
    const mensajeRol = `Haz iniciado sesión como ${user.rol}.`;

    return res.json({ mensaje: mensajeRol, token, endpointsLimitados });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
}

module.exports = {
  loginUser,
};

