const { espacios } = require('../models/espacios.m');

class EspaciosController {
  async listarEspacios(req, res) {
    try {
      const listaEspacios = await espacios.obtenerEspacios();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaEspacios);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('espacios/listarEspacios', { espacios: listaEspacios });
      }  
    } catch (error) {
      console.error('Error al obtener los espacios:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los espacios.' });
    }
  }

  async obtenerEspacio(req, res) {
    try {
      const id = parseInt(req.params.id);
      const espacio = await espacios.obtenerEspacioPorId(id);
      // Verificar si la solicitud es una solicitud AJAX (utilizando el encabezado X-Requested-With)
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      if (espacio) {
        res.json(espacio);
      } else {
        res.status(404).json({ message: 'Espacio no encontrado' });
      }
    } else {
      // Si es una solicitud regular, renderizar la vista EJS
      if (espacio) {
        res.render('espacios/obtenerEspacioPorId', { espacio });
      } else {
        res.status(404).json({ message: 'Espacio no encontrado' });
        }
      }
    } catch (error) {
      console.error('Error al obtener el espacio por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el espacio por ID.' });
    }
  }

  async agregarEspacio(req, res) {
    try {
      const nuevoEspacio = req.body;
      await espacios.agregarEspacio(nuevoEspacio);
      res.status(201).json({ message: 'Espacio agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar el espacio:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar el espacio.' });
    }
  }

  async editarEspacio(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await espacios.editarEspacio(id, nuevaInformacion);
      res.json({ message: 'Espacio editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el espacio:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el espacio.' });
    }
  }

  async eliminarEspacio(req, res) {
    try {
      const id = parseInt(req.params.id);
      await espacios.eliminarEspacio(id);
      res.json({ message: 'Espacio eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el espacio:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el espacio.' });
    }
  }
}

module.exports = EspaciosController;
