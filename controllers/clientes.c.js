const { clientes } = require('../models/clientes.m');

class ClientesController {
  async listarClientes(req, res) {
    try {
      const listaClientes = await clientes.obtenerClientes();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaClientes);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('clientes/listarClientes', { clientes: listaClientes });
      }  
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los clientes.' });
    }
  }

  async obtenerCliente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const cliente = await clientes.obtenerClientePorId(id); 
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } else {
      // Si es una solicitud regular, renderizar la vista EJS y pasar la información del cliente
      res.render('clientes/obtenerClientePorId', { cliente });
    }
  } catch (error) {
    console.error('Error al obtener el cliente por ID:', error);
    res.status(500).json({ message: 'Ocurrió un error al obtener el cliente por ID.' });
  }
}

// Controlador async para agregar un nuevo cliente
async agregarCliente(req, res) {
  // Guardar el JWT en una variable antes de eliminarlo del objeto req.body
  const jwt = req.body.jwt;

  // Eliminar el campo jwt del objeto req.body
  delete req.body.jwt;

  try {
    // Clonar el objeto req.body para evitar modificarlo directamente
    const nuevoCliente = { ...req.body };
    await clientes.agregarCliente(nuevoCliente);

    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      res.status(201).json({ message: 'Cliente agregado exitosamente' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML
      res.render('clientes/nuevoCliente', { message: 'Cliente agregado exitosamente' });
    }

    // Restaurar el JWT en el cuerpo de la solicitud después de agregar el cliente
    req.body.jwt = jwt;
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar una respuesta de error en JSON
      res.status(500).json({ message: 'Ocurrió un error al agregar el cliente.' });
    } else {
      // Si es una solicitud normal POST, mostrar el formulario HTML 
      res.render('clientes/nuevoCliente', { message: 'Agregue un nuevo cliente...' });
    }
  }
}

  async editarCliente(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await clientes.editarCliente(id, nuevaInformacion);
      res.json({ message: 'Cliente editado exitosamente' });
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar el cliente.' });
    }
  }

  async eliminarCliente(req, res) {
    try {
      const id = parseInt(req.params.id);
      await clientes.eliminarCliente(id);
      res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar el cliente.' });
    }
  }
}

module.exports = ClientesController;