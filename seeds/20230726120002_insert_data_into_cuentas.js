exports.up = function (knex) {
    return knex('cuentas').insert([
      { nombre: 'Cuenta 6', descripcion: 'Descripción de la Cuenta 6', serial: 'SERIAL-006', fechaAdquisicion: '2023-07-23', estado: 'Inactivo' },
      { nombre: 'Cuenta 9', descripcion: 'Descripción de la Cuenta 9', serial: 'SERIAL-009', fechaAdquisicion: '2023-08-23', estado: 'Activo' },
      { nombre: 'Cuenta 5', descripcion: 'Descripción de la Cuenta 5', serial: 'SERIAL-005', fechaAdquisicion: '2023-07-19', estado: 'Activo' },
      { nombre: 'Cuenta 7', descripcion: 'Descripción de la Cuenta 7', serial: 'SERIAL-007', fechaAdquisicion: '2023-07-19', estado: 'Activo' },
      { nombre: 'Cuenta 8', descripcion: 'Descripción de la Cuenta 8', serial: 'SERIAL-008', fechaAdquisicion: '2023-07-19', estado: 'Inactivo' },
    ]);
  };
  
  exports.down = function (knex) {
    return knex('cuentas').del();
  };
  