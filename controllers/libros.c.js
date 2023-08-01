const { libros } = require('../models/libros.m');

class LibrosController {
  async listarLibros(req, res) {
    try {
      const listaLibros = await libros.obtenerLibros();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaLibros);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('libros/listarLibros', { libros: listaLibros });
      }  
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los libros.' });
    }
  }

  async obtenerLibro(req, res) {
    try {
      const id = parseInt(req.params.id);
      const libro = await libros.obtenerLibroPorId(id); 
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        if (libro) {
          res.json(libro);
        } else {
          res.status(404).json({ message: 'Libro no encontrado' });
        }
      } else {
        // Si es una solicitud regular, renderizar la vista EJS y pasar la información del libro
        res.render('libros/obtenerLibroPorId', { libro });
      }
    } catch (error) {
      console.error('Error al obtener el libro por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el libro por ID.' });
    }
  }

  async agregarLibro(req, res) {
    // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
    const jwt = req.body.jwt;

    // Eliminar el campo jwt del objeto req.body
    delete req.body.jwt;

    try {
      // Clonar el objeto req.body para evitar modificarlo directamente
      const nuevoLibro = { ...req.body };
      await libros.agregarLibro(nuevoLibro);

      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.status(201).json({ message: 'Libro agregado exitosamente' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML
        res.render('libros/nuevoLibro', { message: 'Libro agregado exitosamente' });
      }

      // Restaurar el JWT en el cuerpo de la solicitud después de agregar el libro
      req.body.jwt = jwt;
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar una respuesta de error en JSON
        res.status(500).json({ message: 'Ocurrió un error al agregar el libro.' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML 
        res.render('libros/nuevoLibro', { message: 'Agregue un nuevo libro...' });
      }
    }
  }

  async editarLibro(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await libros.editarLibro(id, nuevaInformacion);
      res.json({ message: 'Libro editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el libro:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el libro.' });
    }
  }

  async eliminarLibro(req, res) {
    try {
      const id = parseInt(req.params.id);
      await libros.eliminarLibro(id);
      res.json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el libro.' });
    }
  }
}

module.exports = LibrosController;
