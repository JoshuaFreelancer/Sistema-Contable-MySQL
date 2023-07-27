const { cuentas } = require('../models/cuentas.m');

class CuentasController {
  async listarCuentas(req, res) {
    try {
      const listaCuentas = await cuentas.obtenerCuentas();
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        res.json(listaCuentas);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS
        res.render('cuentas/listarCuentas', { cuentas: listaCuentas });
      }  
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener las cuentas.' });
    }
  }

  async obtenerCuenta(req, res) {
    try {
      const id = parseInt(req.params.id);
      const cuenta = await cuentas.obtenerCuentaPorId(id);
     // Verificar si la solicitud es una solicitud AJAX (utilizando el encabezado X-Requested-With)
    if (req.xhr) {
      // Si es una solicitud AJAX, enviar la respuesta JSON
      if (cuenta) {
        res.json(cuenta);
      } else {
        res.status(404).json({ message: 'Cuenta no encontrada' });
      }
    } else {
      // Si es una solicitud regular, renderizar la vista EJS
      if (cuenta) {
        res.render('cuentas/obtenerCuentaPorId', { cuenta });
      } else {
        res.status(404).json({ message: 'Cuenta no encontrada' });
        }
      }
    } catch (error) {
      console.error('Error al obtener la cuenta por ID:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener la cuenta por ID.' });
    }
  }

  async agregarCuenta(req, res) {
    try {
      const nuevaCuenta = req.body;
      await cuentas.agregarCuenta(nuevaCuenta);
      res.status(201).json({ message: 'Cuenta agregada exitosamente' });
    } catch (error) {
      console.error('Error al agregar la cuenta:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar la cuenta.' });
    }
  }

  async editarCuenta(req, res) {
    try {
      const id = parseInt(req.params.id);
      const nuevaInformacion = req.body;
      await cuentas.editarCuenta(id, nuevaInformacion);
      res.json({ message: 'Cuenta editada exitosamente' });
    } catch (error) {
      console.error('Error al editar la cuenta:', error);
      res.status(500).json({ message: 'Ocurrió un error al editar la cuenta.' });
    }
  }

  async eliminarCuenta(req, res) {
    try {
      const id = parseInt(req.params.id);
      await cuentas.eliminarCuenta(id);
      res.json({ message: 'Cuenta eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar la cuenta.' });
    }
  }

  // Nuevo endpoint para filtrar cuentas por estado
  async obtenerCuentasPorEstado(req, res) {
    try {
      const estado = req.params.estado;
      const cuentasPorEstado = await cuentas.obtenerCuentasPorEstado(estado);
  
      // Verificar si la solicitud es una solicitud AJAX (utilizando el encabezado X-Requested-With)
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON
        if (cuentasPorEstado.length === 0) {
          return res.status(404).json({ message: 'No se encontraron cuentas para el estado especificado.' });
        }
        res.json(cuentasPorEstado);
      } else {
        // Si es una solicitud regular, renderizar la vista EJS para mostrar la lista de cuentas filtradas por estado
        if (cuentasPorEstado.length === 0) {
          return res.status(404).render('error', { message: 'No se encontraron cuentas para el estado especificado.' });
        }
        res.render('cuentas/obtenerCuentasPorEstado', { estado, cuentas: cuentasPorEstado });
      }
    } catch (error) {
      console.error('Error al buscar cuentas por estado:', error);
  
      // Verificar si la solicitud es una solicitud AJAX (utilizando el encabezado X-Requested-With)
      if (req.xhr) {
        // Si es una solicitud AJAX, enviar la respuesta JSON con el error
        res.status(500).json({ message: 'Ocurrió un error al buscar las cuentas por estado.' });
      } else {
        // Si es una solicitud regular, renderizar la vista EJS con el error
        res.status(500).render('error', { error });
      }
    }
  }

  // Nuevo endpoint para eliminar cuentas por estado
  async eliminarCuentasPorEstado(req, res) {
    try {
      const estado = req.params.estado;
      await cuentas.eliminarCuentasPorEstado(estado);
      res.json({ message: `Se eliminaron todas las cuentas con el estado "${estado}" exitosamente` });
    } catch (error) {
      console.error('Error al eliminar cuentas por estado:', error);
      res.status(500).json({ message: 'Ocurrió un error al eliminar las cuentas por estado.' });
    }
  }
}

module.exports = CuentasController;
