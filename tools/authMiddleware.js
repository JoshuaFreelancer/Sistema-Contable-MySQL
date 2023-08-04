const { verifyToken } = require('../tools/auth');
const { registrarAccion } = require('../tools/historial');

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
  // Nuevas entidades para el proyecto
  '/almacen': {
    rolesPermitidos: ['Contador', 'Personal'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/libros': {
    rolesPermitidos: ['Contador'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/empleados': {
    rolesPermitidos: ['Contador', 'Personal'],
    operacionesPermitidas: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  '/historial': {
    rolesPermitidos: ['Contador', 'Personal', 'Facturador'],
    operacionesPermitidas: ['GET'],
  },
  '/usuarios': {
    rolesPermitidos: ['Contador', 'Personal', 'Facturador'],
    operacionesPermitidas: ['GET'],
  },
};

// Middleware para verificar el JWT y el rol del usuario
async function authenticateUser(req, res, next) {
  try {
    // Intenta obtener el JWT del campo jwt en el cuerpo de la solicitud o del encabezado de autorización
    const token = req.body.jwt || (req.header('Authorization') || '').replace('Bearer ', '');

    // Si no se encontró un JWT válido, retornar un error
    if (!token) {
      return res.status(401).json({ error: 'Token inválido o no proporcionado.' });
    }

    // Verificar el JWT proporcionado por el cliente
    const decodedToken = verifyToken(token);

    // Obtener el rol del usuario desde el JWT
    const { rol } = decodedToken;

    // Obtener el nombre del usuario desde el JWT
    const { nombre } = decodedToken;

    // Obtener el nombre id desde el JWT
    const { id } = decodedToken;

    // Configurar req.user con la información del usuario
    req.user = {
      rol,
      nombre,
      id,
    };

    // Obtener la ruta solicitada y el método de la solicitud (GET, POST, PUT, DELETE)
    const rutaSolicitada = req.path;
    const metodoSolicitud = req.method;

    // Verificar si la ruta solicitada está protegida y si el rol del usuario está permitido
    const rutaProtegida = rutasProtegidas[rutaSolicitada] || rutasProtegidas['/' + rutaSolicitada.split('/')[1]];
    if (rutaProtegida) {
      // Si la ruta está protegida, verificar si el rol del usuario está permitido para esta ruta
      if (rutaProtegida.rolesPermitidos.includes(rol)) {
        // Si el rol del usuario está permitido, verificar si la operación está permitida
        if (rutaProtegida.operacionesPermitidas.includes(metodoSolicitud)) {
          // Registrar la acción en el historial antes de continuar con la solicitud
          await registrarAccion(req, metodoSolicitud);
          // Si la operación está permitida, continuar con la solicitud
          return next();
        } else {
          // Si la operación no está permitida para el rol del usuario, retornar un error de acceso no autorizado
          return res.status(403).json({ error: 'Operación no permitida para el rol del usuario.' });
        }
      } else {
        // Si el rol del usuario no está permitido para esta ruta, retornar un error de acceso no autorizado
        return res.status(403).json({ error: 'Acceso no autorizado.' });
      }
    }

    // Si la ruta no está protegida, continuar con la solicitud (rutas accesibles para cualquier usuario del mismo rol)
    return next();
  } catch (error) {
    console.error('Error al verificar el JWT:', error);
    return res.status(401).json({ error: 'Token inválido o caducado.' });
  }
}

module.exports = {
  authenticateUser,
};