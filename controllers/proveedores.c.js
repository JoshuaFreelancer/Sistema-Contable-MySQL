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

  // Controlador async para agregar un nuevo proveedor
async agregarProveedor(req, res) {
  // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;

  try {
    // Clonar el objeto req.body para evitar modificarlo directamente
    const nuevoProveedor = { ...req.body };
    await proveedores.agregarProveedor(nuevoProveedor);

    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      res.status(201).json({ message: 'Proveedor agregado exitosamente' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML
      res.render('proveedores/nuevoProveedor', { message: 'Proveedor agregado exitosamente' });
    }

    // Restaurar el JWT en el cuerpo de la solicitud después de agregar el proveedor
    req.body.jwt = jwt;
  } catch (error) {
    console.error('Error al agregar el proveedor:', error);
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar una respuesta de error en JSON
      res.status(500).json({ message: 'Ocurrió un error al agregar el proveedor.' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML 
      res.render('proveedores/nuevoProveedor', { message: 'Agregue un nuevo proveedor...' });
    }
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