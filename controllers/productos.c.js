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

  async agregarProducto(req, res) {
    try {
      const nuevoProducto = req.body;
      // Aquí podrías realizar validaciones y otras acciones necesarias antes de agregar el producto
      await productos.agregarProducto(nuevoProducto);
      res.status(201).json({ message: 'Producto agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar el producto.' });
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
