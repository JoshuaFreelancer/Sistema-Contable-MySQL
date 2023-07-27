const { facturas } = require('../models/facturas.m');

class FacturasController {
  async listarFacturas(req, res) {
    try {
      const listaFacturas = await facturas.obtenerFacturas();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaFacturas);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('facturas/listarFacturas', { facturas: listaFacturas });
      }  
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener las facturas.' });
    }
  }

  async obtenerFactura(req, res) {
    try {
      const id = parseInt(req.params.id);
      const factura = await facturas.obtenerFacturaPorId(id);
       // Verificar si la solicitud es una solicitud AJAX (utilizando el encabezado X-Requested-With)
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      if (factura) {
        res.json(factura);
      } else {
        res.status(404).json({ message: 'Factura no encontrada' });
      }
    } else {
      // Si es una solicitud regular, renderizar la vista EJS
      if (factura) {
        res.render('facturas/obtenerFacturaPorId', { factura });
      } else {
        res.status(404).json({ message: 'Factura no encontrada' });
        }
      }
    } catch (error) {
      console.error('Error al obtener la factura por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la factura por ID.' });
    }
  }

  async agregarFactura(req, res) {
    try {
      const nuevaFactura = req.body;
      await facturas.agregarFactura(nuevaFactura);
      res.status(201).json({ message: 'Factura agregada exitosamente' });
    } catch (error) {
      console.error('Error al agregar la factura:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar la factura.' });
    }
  }

  async editarFactura(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await facturas.editarFactura(id, nuevaInformacion);
      res.json({ message: 'Factura editada exitosamente' });
    } catch (error) {
      console.error('Error al editar la factura:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar la factura.' });
    }
  }

  async eliminarFactura(req, res) {
    try {
      const id = parseInt(req.params.id);
      await facturas.eliminarFactura(id);
      res.json({ message: 'Factura eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar la factura.' });
    }
  }

  //Nuevo Endpoint
  async obtenerFacturasPorFecha(req, res) {
    try {
      const fecha = req.params.fecha;
      const facturasPorFecha = await facturas.obtenerFacturasPorFecha(fecha);
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(facturasPorFecha);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        const fechaFiltrada = new Date(fecha);
        res.render('facturas/obtenerFacturasPorFecha', { facturasPorFecha: facturasPorFecha, fechaFiltrada: fechaFiltrada });
      }
    } catch (error) {
      console.error('Error al obtener las facturas por fecha:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener las facturas por fecha.' });
    }
  }

  //Nuevo Endpoint
  async obtenerFacturasPorCliente(req, res) {
    try {
      const nombreCliente = req.params.nombreCliente;
      const facturasPorCliente = await facturas.obtenerFacturasPorCliente(nombreCliente);
  
      if (facturasPorCliente.length === 0) {
        if (req.xhr) {
          return res.status(404).json({ message: 'No se encontraron facturas para el cliente especificado.' });
        } else {
          // Si no es una solicitud AJAX, renderizar la vista EJS con el mensaje de error
          return res.render('facturas/facturasPorCliente', { facturasPorCliente: [], mensaje: 'No se encontraron facturas para el cliente especificado.', cliente: nombreCliente });
        }
      }
  
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(facturasPorCliente);
      } else {
        // Si no es una solicitud AJAX, renderizar la vista EJS con los datos de las facturas
        res.render('facturas/facturasPorCliente', { facturasPorCliente: facturasPorCliente, mensaje: null, cliente: nombreCliente });
      }
    } catch (error) {
      console.error('Error al buscar facturas por cliente:', error);
      res.status(500).json({ message: 'Ocurrió un error al buscar las facturas del cliente.' });
    }
  }
}

module.exports = FacturasController;
