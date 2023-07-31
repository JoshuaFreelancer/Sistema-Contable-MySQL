const { body, validationResult } = require('express-validator');

// Función genérica para validar datos de un modelo específico
const validarDatosModelo = (modelo) => {
  return async (req, res, next) => {
    // Obtener las reglas de validación específicas para el modelo
    const reglas = obtenerReglasValidacion(modelo);
    // Ejecutar las reglas de validación
    await Promise.all(reglas.map((regla) => regla.run(req)));
    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(422).json({ errores: errores.array() });
    }
    next();
  };
};

// Obtener las reglas de validación específicas para el modelo
const obtenerReglasValidacion = (modelo) => {
  switch (modelo) {
    case 'clientes':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('direccion').notEmpty().withMessage('El campo dirección es obligatorio'),
        body('telefono').isNumeric().withMessage('El campo teléfono debe ser solo numérico')
          .isLength({ min: 9, max: 9 }).withMessage('El campo teléfono debe tener 9 dígitos'),
        body('correo').isEmail().withMessage('El campo correo debe ser una dirección de correo válida'),
      ];
    case 'cuentas':
      // Reglas de validación para el modelo "cuentas"
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('El campo descripción es obligatorio'),
        body('serial').notEmpty().withMessage('El campo serial es obligatorio'),
        body('fechaAdquisicion').notEmpty().withMessage('El campo fecha de adquisición es obligatorio').isDate().withMessage('El campo fecha de adquisición debe ser una fecha válida (ejemplo: 2023-07-19)'),
        body('estado').notEmpty().withMessage('El campo estado es obligatorio').isIn(['Activo', 'Inactivo']).withMessage('El campo estado debe ser uno de los valores: Activo o Inactivo'),
      ];
    case 'espacios':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('ubicacion').notEmpty().withMessage('El campo ubicación es obligatorio'),
        body('capacidad').isInt({ min: 1 }).withMessage('El campo capacidad debe ser un número entero mayor que cero'),
      ];
    case 'facturas':
      return [
        body('cliente').notEmpty().withMessage('El campo cliente es obligatorio'),
        body('proveedor').notEmpty().withMessage('El campo proveedor es obligatorio'),
        body('productos').notEmpty().withMessage('El campo productos es obligatorio'),
        body('total').isDecimal({ decimal_digits: '2' }).withMessage('El campo total debe ser un número decimal con dos dígitos'),
        body('fecha').notEmpty().withMessage('El campo fecha es obligatorio').isDate().withMessage('El campo fecha debe ser una fecha válida (ejemplo: 2023-07-19)'),
      ];
    case 'productos':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('El campo descripción es obligatorio'),
        body('precio').isDecimal({ decimal_digits: '2' }).withMessage('El campo precio debe ser un número decimal con dos dígitos'),
        body('categoria').notEmpty().withMessage('El campo categoría es obligatorio'),
        body('stock').isInt.withMessage('El campo stock debe ser un número entero'),
      ];
    case 'proveedores':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('direccion').notEmpty().withMessage('El campo dirección es obligatorio'),
        body('telefono').isNumeric().withMessage('El campo teléfono debe ser solo numérico')
          .isLength({ min: 9, max: 9 }).withMessage('El campo teléfono debe tener 9 dígitos'),
        body('correo').isEmail().withMessage('El campo correo debe ser una dirección de correo válida'),
      ];
    case 'servicios':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('El campo descripción es obligatorio'),
        body('precio').isDecimal({ decimal_digits: '2' }).withMessage('El campo precio debe ser un número decimal con dos dígitos'),
        body('categoria').notEmpty().withMessage('El campo categoría es obligatorio'),
      ];
    case 'usuarios':
      return [
        body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
        body('clave').notEmpty().withMessage('El campo clave es obligatorio'),
        body('rol').notEmpty().withMessage('El campo rol es obligatorio').isIn(['Facturador', 'Contador', 'Personal']).withMessage('El campo rol debe ser uno de los valores: Facturador, Contador, Personal'),
      ];
    // Agregar reglas de validación para otros modelos según sea necesario
    default:
      return [];
  }
};

module.exports = {
  validarDatosModelo,
};
