const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas de la aplicación
const cuentasRoutes = require('./routes/cuentas.r');
const clientesRoutes = require('./routes/clientes.r');
const proveedoresRoutes = require('./routes/proveedores.r');
const almacenRoutes = require('./routes/almacen.r'); //X Limitada para Personal
const librosRoutes = require('./routes/libros.r');
const empleadosRoutes = require('./routes/empleados.r'); //X Limitada para Personal
const productosRoutes = require('./routes/productos.r'); //X Limitada para Personal
const serviciosRoutes = require('./routes/servicios.r'); //X Limitada para Personal
const facturasRoutes = require('./routes/facturas.r');
const espaciosRouter = require('./routes/espacios.r'); //X Limitada para Personal
const loginRouter = require('./routes/login.r'); // Logueo
const usuariosRouter = require('./routes/usuarios.r'); // Registro y Listado de usuarios
const ayudaRouter = require('./routes/ayuda.r');

// Montar el enrutador de la aplicación
app.use(
  '/api',
  cuentasRoutes,
  clientesRoutes,
  proveedoresRoutes,
  productosRoutes,
  serviciosRoutes,
  facturasRoutes,
  espaciosRouter,
  loginRouter,
  usuariosRouter,
  almacenRoutes,
  librosRoutes,
  empleadosRoutes,
  ayudaRouter
);

// Configuración EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Gestion de rutas EJS
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el mensaje de bienvenida
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bienvenido a la base de datos Sistema Contable',
    message: `Para usar la aplicación, regístrate usando la ruta localhost:${port}/api/register y loguéate con localhost:${port}/api/login. Si necesitas mas información consulta la ruta /api/ayuda ¡Disfruta de la aplicación!`,
  });
});

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});

module.exports = app;