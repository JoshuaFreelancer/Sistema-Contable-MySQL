const { servicios } = require('../models/servicios.m');

class ServiciosController {
  async listarServicios(req, res) {
    try {
      const listaServicios = await servicios.obtenerServicios();
  
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaServicios);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('servicios/todosLosServicios', { servicios: listaServicios });
      }
    } catch (error) {
      console.error('Error al obtener la lista de servicios:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la lista de servicios.' });
    }
  }

  async obtenerServicio(req, res) {
    try {
      const id = parseInt(req.params.id);
      const servicio = await servicios.obtenerServicioPorId(id);
  
      if (servicio) {
        if (req.xhr) {
          // Si es una solicitud AJAX, enviar la respuesta JSON
          res.json(servicio);
        } else {
          // Si es una solicitud regular, renderizar la vista EJS
          res.render('servicios/detallesServicio', { servicio: servicio });
        }
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el servicio por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el servicio.' });
    }
  }

 // Controlador async para agregar un nuevo servicio
async agregarServicio(req, res) {
  // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;

  try {
    // Clonar el objeto req.body para evitar modificarlo directamente
    const nuevoServicio = { ...req.body };
    // Aquí podrías realizar validaciones y otras acciones necesarias antes de agregar el servicio
    await servicios.agregarServicio(nuevoServicio);

    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      res.status(201).json({ message: 'Servicio agregado exitosamente' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML
      res.render('servicios/nuevoServicio', { message: 'Servicio agregado exitosamente' });
    }

    // Restaurar el JWT en el cuerpo de la solicitud después de agregar el servicio
    req.body.jwt = jwt;
  } catch (error) {
    console.error('Error al agregar el servicio:', error);
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar una respuesta de error en JSON
      res.status(500).json({ message: 'Ocurrió un error al agregar el servicio.' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML 
      res.render('servicios/nuevoServicio', { message: 'Agregue un nuevo servicio...' });
    }
  }
}

  async editarServicio(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      // Aquí podrías realizar validaciones y otras acciones necesarias antes de editar el servicio
      await servicios.editarServicio(id, nuevaInformacion);
      res.json({ message: 'Servicio editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el servicio:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el servicio.' });
    }
  }

  async eliminarServicio(req, res) {
    try {
      const id = parseInt(req.params.id);
      await servicios.eliminarServicio(id);
      res.json({ message: 'Servicio eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el servicio.' });
    }
  }
}

module.exports = ServiciosController;
