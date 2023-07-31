var express = require('express');
var path = require('path');

//Variables nuevas
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Variables de la aplicacion

// Para el Usuario Contador
const cuentasRoutes = require('./routes/cuentas.r'); 
const clientesRoutes = require('./routes/clientes.r'); 
const proveedoresRoutes = require('./routes/proveedores.r'); 

// Para el Usuario Facturador
const productosRoutes = require('./routes/productos.r'); //X Limitada para Personal 
const serviciosRoutes = require('./routes/servicios.r');//X Limitada para Personal 
const facturasRoutes = require('./routes/facturas.r'); 
const espaciosRouter = require('./routes/espacios.r'); //X Limitada para Personal 

// Variables de logueo

// Logueo
const loginRouter = require('./routes/login.r'); 

// Registro y Listado de usuarios
const usuariosRouter = require('./routes/usuarios.r');

// Montar el enrutador de la aplicacion
app.use('/api', cuentasRoutes, clientesRoutes, proveedoresRoutes, productosRoutes,
serviciosRoutes, facturasRoutes, espaciosRouter, loginRouter, usuariosRouter);

// Configuracion EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Gestion de rutas EJS
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el mensaje de bienvenida
app.get('/', (req, res) => {
  res.render('index', { title: 'Bienvenido a la base de datos Sistema Contable',
                        message: 'Para usar la aplicación, regístrate usando la ruta localhost:3000/api/register y loguéate con localhost:3000/login. ¡Disfruta de la aplicación!' });
});

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});

module.exports = app;

