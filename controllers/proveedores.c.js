const { proveedores } = require('../models/proveedores.m');

  class ProveedoresController {
    async listarProveedores(req, res) {
      try {
        const listaProveedores = await proveedores.obtenerProveedores();
        if (req.xhr) {
          // Si es una solicitud AJAX, enviar la respuesta JSON
          res.json(listaProveedores);
        } else {
          // Si es una solicitud regular, renderizar la vista EJS
          res.render('proveedores/todosLosProveedores', { proveedores: listaProveedores });
        }
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener los proveedores.' });
      }
    }

    async obtenerProveedor(req, res) {
      try {
        const id = parseInt(req.params.id);
        const proveedor = await proveedores.obtenerProveedorPorId(id);
        if (proveedor) {
          if (req.xhr) {
            // Si es una solicitud AJAX, enviar la respuesta JSON
            res.json(proveedor);
          } else {
            // Si es una solicitud regular, renderizar la vista EJS
            res.render('proveedores/detallesProveedor', { proveedor });
          }
        } else {
          res.status(404).json({ message: 'Proveedor no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener el proveedor por ID:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener el proveedor por ID.' });
      }
    }

  async agregarProveedor(req, res) {
    try {
      const nuevoProveedor = req.body;
      await proveedores.agregarProveedor(nuevoProveedor);
      res.status(201).json({ message: 'Proveedor agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar el proveedor:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar el proveedor.' });
    }
  }

  async editarProveedor(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await proveedores.editarProveedor(id, nuevaInformacion);
      res.json({ message: 'Proveedor editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el proveedor:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el proveedor.' });
    }
  }

  async eliminarProveedor(req, res) {
    try {
      const id = parseInt(req.params.id);
      await proveedores.eliminarProveedor(id);
      res.json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el proveedor.' });
    }
  }
}

module.exports = ProveedoresController;