const { verifyToken } = require('../tools/auth');

// Definir las rutas protegidas y sus roles permitidos
const rutasProtegidas = {
  '/cuentas': {
    rolesPermitidos: ['Contador'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/clientes': {
    rolesPermitidos: ['Contador'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/proveedores': {
    rolesPermitidos: ['Contador'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/facturas': {
    rolesPermitidos: ['Facturador'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/espacios': {
    rolesPermitidos: ['Facturador', 'Personal'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/productos': {
    rolesPermitidos: ['Facturador', 'Personal'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/servicios': {
    rolesPermitidos: ['Facturador', 'Personal'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};

// Middleware para verificar el JWT y el rol del usuario
function authenticateUser(req, res, next) {
  try {
    // Verificar el JWT proporcionado por el cliente
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = verifyToken(token);

    // Obtener el rol del usuario desde el JWT
    const { rol } = decodedToken;

    // Obtener el nombre de la ruta solicitada y el método de la solicitud (GET, POST, PUT, DELETE)
    const rutaSolicitada = req.path;
    const metodoSolicitud = req.method;

    // Verificar si la ruta solicitada está protegida y si el rol del usuario está permitido
    const rutaProtegida = rutasProtegidas[rutaSolicitada] || rutasProtegidas['/' + rutaSolicitada.split('/')[1]];
    if (rutaProtegida) {
      // Si la ruta está protegida, verificar si el rol del usuario está permitido para esta ruta
      if (rutaProtegida.rolesPermitidos.includes(rol)) {
        // Si el rol del usuario está permitido, verificar si la operación está permitida
        if (rutaProtegida.operacionesPermitidas.includes(metodoSolicitud)) {
          // Si la operación está permitida, continuar con la solicitud
          next();
        } else {
          // Si la operación no está permitida para el rol del usuario, retornar un error de acceso no autorizado
          return res.status(403).json({ error: 'Operación no permitida para el rol del usuario.' });
        }
      } else {
        // Si el rol del usuario no está permitido para esta ruta, retornar un error de acceso no autorizado
        return res.status(403).json({ error: 'Acceso no autorizado.' });
      }
    } else {
      // Si la ruta no está protegida, continuar con la solicitud (rutas accesibles para cualquier usuario del mismo rol)
      next();
    }
  } catch (error) {
    console.error('Error al verificar el JWT:', error);
    return res.status(401).json({ error: 'Token inválido o caducado.' });
  }
}

module.exports = {
  authenticateUser,
};


