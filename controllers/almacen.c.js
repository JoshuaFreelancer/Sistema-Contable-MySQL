const { almacen } = require('../models/almacen.m');

class AlmacenController {
  async listarProductosEnAlmacen(req, res) {
    try {
      const listaProductosEnAlmacen = await almacen.obtenerProductosEnAlmacen();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaProductosEnAlmacen);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('almacen/listarProductosEnAlmacen', { productosEnAlmacen: listaProductosEnAlmacen });
      }  
    } catch (error) {
      console.error('Error al obtener los productos en el almacén:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los productos en el almacén.' });
    }
  }

  async obtenerProductoEnAlmacenPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productoEnAlmacen = await almacen.obtenerProductoEnAlmacenPorId(id); 
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        if (productoEnAlmacen) {
          res.json(productoEnAlmacen);
        } else {
          res.status(404).json({ message: 'Producto en el almacén no encontrado' });
        }
      } else {
        // Si es una solicitud regular, renderizar la vista EJS y pasar la información del producto en el almacén
        res.render('almacen/obtenerProductoEnAlmacenPorId', { productoEnAlmacen });
      }
    } catch (error) {
      console.error('Error al obtener el producto en el almacén por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el producto en el almacén por ID.' });
    }
  }

  async agregarProductoEnAlmacen(req, res) {
    // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;
    try {
      
      // Clonar el objeto req.body para evitar modificarlo directamente
      const nuevoProductoEnAlmacen = { ...req.body };
      await almacen.agregarProductoEnAlmacen(nuevoProductoEnAlmacen);

      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.status(201).json({ message: 'Producto agregado al almacén exitosamente' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML
        res.render('almacen/nuevoProductoEnAlmacen', { message: 'Producto agregado al almacén exitosamente' });
      }
      // Restaurar el JWT en el cuerpo de la solicitud después de agregar el cliente
    req.body.jwt = jwt;
    } catch (error) {
      console.error('Error al agregar el producto al almacén:', error);
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar una respuesta de error en JSON
        res.status(500).json({ message: 'Ocurrió un error al agregar el producto al almacén.' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML 
        res.render('almacen/nuevoProductoEnAlmacen', { message: 'Agregue un nuevo producto al almacén...' });
      }
    }
  }

  async editarProductoEnAlmacen(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await almacen.editarProductoEnAlmacen(id, nuevaInformacion);
      res.json({ message: 'Producto en el almacén editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el producto en el almacén:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el producto en el almacén.' });
    }
  }

  async eliminarProductoEnAlmacen(req, res) {
    try {
      const id = parseInt(req.params.id);
      await almacen.eliminarProductoEnAlmacen(id);
      res.json({ message: 'Producto en el almacén eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el producto en el almacén:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el producto en el almacén.' });
    }
  }
}

module.exports = AlmacenController;
