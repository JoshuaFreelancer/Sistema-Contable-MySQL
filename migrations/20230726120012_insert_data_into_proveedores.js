exports.up = function (knex) {
    return knex('proveedores').insert([
      { nombre: 'Proveedor 1', direccion: 'Dirección del Proveedor 1', telefono: '11111111', correo: 'proveedor1@correo.com' },
      { nombre: 'Proveedor 2', direccion: 'Dirección del Proveedor 2', telefono: '22222222', correo: 'proveedor2@correo.com' },
      { nombre: 'Proveedor 3', direccion: 'Dirección del Proveedor 3', telefono: '33333333', correo: 'proveedor3@correo.com' },
      { nombre: 'Proveedor 4', direccion: 'Dirección del Proveedor 4', telefono: '44444444', correo: 'proveedor4@correo.com' },
    ]);
  };
  
  exports.down = function (knex) {
    return knex('proveedores').del();
  };
  