exports.up = function (knex) {
    return knex('espacios').insert([
      { nombre: 'Espacio A', ubicacion: 'Piso 1', capacidad: 50 },
      { nombre: 'Espacio B', ubicacion: 'Piso 2', capacidad: 30 },
      { nombre: 'Espacio C', ubicacion: 'Piso 3', capacidad: 100 },
      { nombre: 'Espacio D', ubicacion: 'Piso 4', capacidad: 70 },
    ]);
  };
  
  exports.down = function (knex) {
    return knex('espacios').del();
  };
  