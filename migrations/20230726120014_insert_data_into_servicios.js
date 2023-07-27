exports.up = function (knex) {
    return knex('servicios').insert([
      { nombre: 'Servicio 1', descripcion: 'Descripción del servicio 1', precio: '200.00', categoria: 'Tecnología' },
      { nombre: 'Servicio 2', descripcion: 'Descripción del servicio 2', precio: '150.00', categoria: 'Limpieza' },
      { nombre: 'Servicio 3', descripcion: 'Descripción del servicio 3', precio: '300.00', categoria: 'Mantenimiento' },
      { nombre: 'Servicio 4', descripcion: 'Descripción del servicio 4', precio: '250.00', categoria: 'Consultoría' },
    ]);
  };
  
  exports.down = function (knex) {
    return knex('servicios').del();
  };
  