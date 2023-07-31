const { productos } = require('../models/productos.m');

class ProductosController {
  async listarProductos(req, res) {
    try {
      const listaProductos = await productos.obtenerProductos();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaProductos);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('productos/todosLosProductos', { productos: listaProductos });
      }
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la lista de productos.' });
    }
  }
  
  async obtenerProducto(req, res) {
    try {
      const id = parseInt(req.params.id);
      const producto = await productos.obtenerProductoPorId(id);
      if (producto) {
        if (req.xhr) {
          // Si es una solicitud AJAX, enviar la respuesta JSON
          res.json(producto);
        } else {
          // Si es una solicitud regular, renderizar la vista EJS
          res.render('productos/detallesProducto', { producto });
        }
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el producto.' });
    }
  }

  // Controlador async para agregar un nuevo producto
async agregarProducto(req, res) {
  // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;

  try {
    // Clonar el objeto req.body para evitar modificarlo directamente
    const nuevoProducto = { ...req.body };
    // Aquí podrías realizar validaciones y otras acciones necesarias antes de agregar el producto
    await productos.agregarProducto(nuevoProducto);

    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      res.status(201).json({ message: 'Producto agregado exitosamente' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML
      res.render('productos/nuevoProducto', { message: 'Producto agregado exitosamente' });
    }

    // Restaurar el JWT en el cuerpo de la solicitud después de agregar el producto
    req.body.jwt = jwt;
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar una respuesta de error en JSON
      res.status(500).json({ message: 'Ocurrió un error al agregar el producto.' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML 
      res.render('productos/nuevoProducto', { message: 'Agregue un nuevo producto...' });
    }
  }
}


  async editarProducto(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      // Aquí podrías realizar validaciones y otras acciones necesarias antes de editar el producto
      await productos.editarProducto(id, nuevaInformacion);
      res.json({ message: 'Producto editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el producto:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el producto.' });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const id = parseInt(req.params.id);
      await productos.eliminarProducto(id);
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el producto.' });
    }
  }
}

module.exports = ProductosController;
