const { empleados } = require('../models/empleados.m');

class EmpleadosController {
  async listarEmpleados(req, res) {
    try {
      const listaEmpleados = await empleados.obtenerEmpleados();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaEmpleados);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('empleados/listarEmpleados', { empleados: listaEmpleados });
      }  
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los empleados.' });
    }
  }

  async obtenerEmpleado(req, res) {
    try {
      const id = parseInt(req.params.id);
      const empleado = await empleados.obtenerEmpleadoPorId(id); 
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        if (empleado) {
          res.json(empleado);
        } else {
          res.status(404).json({ message: 'Empleado no encontrado' });
        }
      } else {
        // Si es una solicitud regular, renderizar la vista EJS y pasar la información del empleado
        res.render('empleados/obtenerEmpleadoPorId', { empleado });
      }
    } catch (error) {
      console.error('Error al obtener el empleado por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener el empleado por ID.' });
    }
  }

  async agregarEmpleado(req, res) {
    // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;

    try {
      const nuevoEmpleado = { ...req.body };
      await empleados.agregarEmpleado(nuevoEmpleado);
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.status(201).json({ message: 'Empleado agregado exitosamente' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML
        res.render('empleados/nuevoEmpleado', { message: 'Empleado agregado exitosamente' });
      }
       // Restaurar el JWT en el cuerpo de la solicitud después de agregar el cliente
    req.body.jwt = jwt;
    
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar una respuesta de error en JSON
        res.status(500).json({ message: 'Ocurrió un error al agregar el empleado.' });
      } else {
        // Si es una solicitud normal POST, mostrar el formulario HTML 
        res.render('empleados/nuevoEmpleado', { message: 'Agregue un nuevo empleado...' });
      }
    }
  }

  async editarEmpleado(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await empleados.editarEmpleado(id, nuevaInformacion);
      res.json({ message: 'Empleado editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el empleado:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el empleado.' });
    }
  }

  async eliminarEmpleado(req, res) {
    try {
      const id = parseInt(req.params.id);
      await empleados.eliminarEmpleado(id);
      res.json({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el empleado.' });
    }
  }
}

module.exports = EmpleadosController;
