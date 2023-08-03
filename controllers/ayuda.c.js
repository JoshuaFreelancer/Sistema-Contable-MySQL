// controllers/ayudaController.js
const mostrarAyuda = (req, res) => {
  const preguntasRespuestas = [
     // Preguntas y respuestas para los endpoints a los que tiene acceso cualquier usuario autenticado
     {
      titulo: 'Login',
      pregunta: '¿Cómo puedo iniciar sesión en el sistema?',
      respuesta: '- Para iniciar sesión en el sistema, realiza una solicitud POST a la ruta /api/login con las credenciales válidas (usuario y contraseña) en el cuerpo de la solicitud. Si las credenciales son correctas, recibirás un token de autenticación que deberás utilizar para acceder a los endpoints protegidos.',
    },
    {
      titulo: 'Usuarios',
      pregunta: '¿Cómo puedo obtener la lista de todos los usuarios registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los usuarios registrados, realiza una solicitud GET a la ruta /api/usuarios. La API te devolverá un array JSON con la información de todos los usuarios disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo usuario al sistema?',
      respuesta: '- Para agregar un nuevo usuario, realiza una solicitud POST a la ruta /api/usuarios con los datos del usuario que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      titulo: 'Datos Protegidos',
      pregunta: '¿Cómo puedo obtener datos protegidos y restringidos solo para usuarios autenticados?',
      respuesta: '- Para obtener datos protegidos, realiza una solicitud GET a la ruta /api/datos-protegidos. Esta ruta está restringida solo para usuarios autenticados, por lo que deberás incluir el token de autenticación en el encabezado de la solicitud para acceder a estos datos.',
    },
    // Preguntas y respuestas para los endpoints con acceso para el rol "Contador"
    {
      titulo: 'Cuentas',
      pregunta: '¿Cómo puedo obtener la lista de todas las cuentas registradas en el sistema?',
      respuesta: '- Para obtener la lista de todas las cuentas registradas, realiza una solicitud GET a la ruta /api/cuentas. La API te devolverá un array JSON con la información de todas las cuentas disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar una nueva cuenta al sistema?',
      respuesta: '- Para agregar una nueva cuenta, realiza una solicitud POST a la ruta /api/cuentas con los datos de la cuenta que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de una cuenta específica por su ID?',
      respuesta: '- Para obtener los detalles de una cuenta específica, realiza una solicitud GET a la ruta /api/cuentas/:id, donde :id es el ID de la cuenta que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de una cuenta existente por su ID?',
      respuesta: '- Para actualizar los datos de una cuenta existente, realiza una solicitud PUT a la ruta /api/cuentas/:id, donde :id es el ID de la cuenta que deseas actualizar, y envía los nuevos datos de la cuenta en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar una cuenta específica por su ID?',
      respuesta: '- Para eliminar una cuenta específica, realiza una solicitud DELETE a la ruta /api/cuentas/:id, donde :id es el ID de la cuenta que deseas eliminar.',
    },

    {
      titulo: 'Proveedores',
      pregunta: '¿Cómo puedo obtener la lista de todos los proveedores registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los proveedores registrados, realiza una solicitud GET a la ruta /api/proveedores. La API te devolverá un array JSON con la información de todos los proveedores disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo proveedor al sistema?',
      respuesta: '- Para agregar un nuevo proveedor, realiza una solicitud POST a la ruta /api/proveedores con los datos del proveedor que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un proveedor específico por su ID?',
      respuesta: '- Para obtener los detalles de un proveedor específico, realiza una solicitud GET a la ruta /api/proveedores/:id, donde :id es el ID del proveedor que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de un proveedor existente por su ID?',
      respuesta: '- Para actualizar los datos de un proveedor existente, realiza una solicitud PUT a la ruta /api/proveedores/:id, donde :id es el ID del proveedor que deseas actualizar, y envía los nuevos datos del proveedor en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un proveedor específico por su ID?',
      respuesta: '- Para eliminar un proveedor específico, realiza una solicitud DELETE a la ruta /api/proveedores/:id, donde :id es el ID del proveedor que deseas eliminar.',
    },
    {
      titulo: 'Clientes',
      pregunta: '¿Cómo puedo obtener la lista de todos los clientes registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los clientes registrados, realiza una solicitud GET a la ruta /api/clientes. La API te devolverá un array JSON con la información de todos los clientes disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo cliente al sistema?',
      respuesta: '- Para agregar un nuevo cliente, realiza una solicitud POST a la ruta /api/clientes con los datos del cliente que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un cliente específico por su ID?',
      respuesta: '- Para obtener los detalles de un cliente específico, realiza una solicitud GET a la ruta /api/clientes/:id, donde :id es el ID del cliente que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de un cliente existente por su ID?',
      respuesta: '- Para actualizar los datos de un cliente existente, realiza una solicitud PUT a la ruta /api/clientes/:id, donde :id es el ID del cliente que deseas actualizar, y envía los nuevos datos del cliente en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un cliente específico por su ID?',
      respuesta: '- Para eliminar un cliente específico, realiza una solicitud DELETE a la ruta /api/clientes/:id, donde :id es el ID del cliente que deseas eliminar.',
    },

    // Preguntas y respuestas para los endpoints con acceso para el rol "Facturador"
    {
      titulo: 'Facturas',
      pregunta: '¿Cómo puedo obtener la lista de todas las facturas registradas en el sistema?',
      respuesta: '- Para obtener la lista de todas las facturas registradas, realiza una solicitud GET a la ruta /api/facturas. La API te devolverá un array JSON con la información de todas las facturas disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar una nueva factura al sistema?',
      respuesta: '- Para agregar una nueva factura, realiza una solicitud POST a la ruta /api/facturas con los datos de la factura que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de una factura específica por su ID?',
      respuesta: '- Para obtener los detalles de una factura específica, realiza una solicitud GET a la ruta /api/facturas/:id, donde :id es el ID de la factura que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de una factura existente por su ID?',
      respuesta: '- Para actualizar los datos de una factura existente, realiza una solicitud PUT a la ruta /api/facturas/:id, donde :id es el ID de la factura que deseas actualizar, y envía los nuevos datos de la factura en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar una factura específica por su ID?',
      respuesta: '- Para eliminar una factura específica, realiza una solicitud DELETE a la ruta /api/facturas/:id, donde :id es el ID de la factura que deseas eliminar.',
    },
    {
      pregunta: '¿Cómo puedo obtener las facturas asociadas a un cliente específico por su nombre?',
      respuesta: '- Para obtener las facturas asociadas a un cliente específico por su nombre, realiza una solicitud GET a la ruta /api/facturas/cliente/:nombreCliente, donde :nombreCliente es el nombre del cliente que deseas consultar.',
    },

    // Preguntas y respuestas para los endpoints con acceso para el rol "Personal"
    {
      titulo: 'Espacios',
      pregunta: '¿Cómo puedo obtener la lista de todos los espacios registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los espacios registrados, realiza una solicitud GET a la ruta /api/espacios. La API te devolverá un array JSON con la información de todos los espacios disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo espacio al sistema?',
      respuesta: '- Para agregar un nuevo espacio, realiza una solicitud POST a la ruta /api/espacios con los datos del espacio que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un espacio específico por su ID?',
      respuesta: '- Para obtener los detalles de un espacio específico, realiza una solicitud GET a la ruta /api/espacios/:id, donde :id es el ID del espacio que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de un espacio existente por su ID?',
      respuesta: '- Para actualizar los datos de un espacio existente, realiza una solicitud PUT a la ruta /api/espacios/:id, donde :id es el ID del espacio que deseas actualizar, y envía los nuevos datos del espacio en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un espacio específico por su ID?',
      respuesta: '- Para eliminar un espacio específico, realiza una solicitud DELETE a la ruta /api/espacios/:id, donde :id es el ID del espacio que deseas eliminar.',
    },

    {
      titulo: 'Productos',
      pregunta: '¿Cómo puedo obtener la lista de todos los productos registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los productos registrados, realiza una solicitud GET a la ruta /api/productos. La API te devolverá un array JSON con la información de todos los productos disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo producto al sistema?',
      respuesta: '- Para agregar un nuevo producto, realiza una solicitud POST a la ruta /api/productos con los datos del producto que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un producto específico por su ID?',
      respuesta: '- Para obtener los detalles de un producto específico, realiza una solicitud GET a la ruta /api/productos/:id, donde :id es el ID del producto que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de un producto existente por su ID?',
      respuesta: '- Para actualizar los datos de un producto existente, realiza una solicitud PUT a la ruta /api/productos/:id, donde :id es el ID del producto que deseas actualizar, y envía los nuevos datos del producto en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un producto específico por su ID?',
      respuesta: '- Para eliminar un producto específico, realiza una solicitud DELETE a la ruta /api/productos/:id, donde :id es el ID del producto que deseas eliminar.',
    },

    {
      titulo: 'Servicios',
      pregunta: '¿Cómo puedo obtener la lista de todos los servicios registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los servicios registrados, realiza una solicitud GET a la ruta /api/servicios. La API te devolverá un array JSON con la información de todos los servicios disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo servicio al sistema?',
      respuesta: '- Para agregar un nuevo servicio, realiza una solicitud POST a la ruta /api/servicios con los datos del servicio que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un servicio específico por su ID?',
      respuesta: '- Para obtener los detalles de un servicio específico, realiza una solicitud GET a la ruta /api/servicios/:id, donde :id es el ID del servicio que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos de un servicio existente por su ID?',
      respuesta: '- Para actualizar los datos de un servicio existente, realiza una solicitud PUT a la ruta /api/servicios/:id, donde :id es el ID del servicio que deseas actualizar, y envía los nuevos datos del servicio en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un servicio específico por su ID?',
      respuesta: '- Para eliminar un servicio específico, realiza una solicitud DELETE a la ruta /api/servicios/:id, donde :id es el ID del servicio que deseas eliminar.',
    },

    // Preguntas y respuestas para los nuevos endpoints del proyecto
    {
      titulo: 'Almacén',
      pregunta: '¿Cómo puedo obtener la lista de todos los objetos del almacén registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los objetos del almacén registrados, realiza una solicitud GET a la ruta /api/almacen. La API te devolverá un array JSON con la información de todos los objetos del almacén disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo objeto almacén en el sistema?',
      respuesta: '- Para agregar un nuevo objeto almacén, realiza una solicitud POST a la ruta /api/almacen con los datos del objeto que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un objeto en el almacén específicamente por su ID?',
      respuesta: '- Para obtener los detalles de un objeto en el almacén específico, realiza una solicitud GET a la ruta /api/almacen/:id, donde :id es el ID del objeto del almacén que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos del objeto existente en el almacén por su ID?',
      respuesta: '- Para actualizar los datos del objeto existente en el almacén, realiza una solicitud PUT a la ruta /api/almacen/:id, donde :id es el ID del objeto del almacén que deseas actualizar, y envía los nuevos datos del objeto en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un objeto del almacén específicamente por su ID?',
      respuesta: '- Para eliminar un objeto del almacén específico, realiza una solicitud DELETE a la ruta /api/almacen/:id, donde :id es el ID del objeto del almacén que deseas eliminar.',
    },

    {
      titulo: 'Libros',
      pregunta: '¿Cómo puedo obtener la lista de todos los libros registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los libros registrados, realiza una solicitud GET a la ruta /api/libros. La API te devolverá un array JSON con la información de todos los libros disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo libro en el sistema?',
      respuesta: '- Para agregar un nuevo libro, realiza una solicitud POST a la ruta /api/libros con los datos del libro que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un libro específico por su ID?',
      respuesta: '- Para obtener los detalles de un libro específico, realiza una solicitud GET a la ruta /api/libros/:id, donde :id es el ID del libro que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos del libro por su ID?',
      respuesta: '- Para actualizar los datos del libro, realiza una solicitud PUT a la ruta /api/libros/:id, donde :id es el ID del libro que deseas actualizar, y envía los nuevos datos del libro en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un libro específico por su ID?',
      respuesta: '- Para eliminar un libro específico, realiza una solicitud DELETE a la ruta /api/libros/:id, donde :id es el ID del libro que deseas eliminar.',
    },

    {
      titulo: 'Empleados',
      pregunta: '¿Cómo puedo obtener la lista de todos los empleados registrados en el sistema?',
      respuesta: '- Para obtener la lista de todos los empleados registrados, realiza una solicitud GET a la ruta /api/empleados. La API te devolverá un array JSON con la información de todos los empleados disponibles.',
    },
    {
      pregunta: '¿Cómo puedo agregar un nuevo empleado en el sistema?',
      respuesta: '- Para agregar un nuevo empleado, realiza una solicitud POST a la ruta /api/empleados con los datos del empleado que deseas agregar en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo obtener los detalles de un empleado específico por su ID?',
      respuesta: '- Para obtener los detalles de un empleado específico, realiza una solicitud GET a la ruta /api/empleados/:id, donde :id es el ID del empleado que deseas obtener.',
    },
    {
      pregunta: '¿Cómo puedo actualizar los datos del empleado por su ID?',
      respuesta: '- Para actualizar los datos del empleado, realiza una solicitud PUT a la ruta /api/empleados/:id, donde :id es el ID del empleado que deseas actualizar, y envía los nuevos datos del empleado en el cuerpo de la solicitud.',
    },
    {
      pregunta: '¿Cómo puedo eliminar un empleado específico por su ID?',
      respuesta: '- Para eliminar un empleado específico, realiza una solicitud DELETE a la ruta /api/empleados/:id, donde :id es el ID del empleado que deseas eliminar.',
    },

    // Pregunta y respuesta para el endpoint de ayuda
    {
      titulo: 'Ayuda',
      pregunta: '¿Cómo puedo obtener los detalles de los anteriores endpoints para informar al cliente?',
      respuesta: '- Para obtener los detalles de los anteriores endpoints y brindar ayuda al cliente, realiza una solicitud GET a la ruta /api/ayuda. La API te devolverá un array JSON con la información de todos los endpoints disponibles y sus respectivas descripciones.',
    },
  ];

  res.render('ayuda', { preguntasRespuestas });
};

module.exports = {
  mostrarAyuda,
};
