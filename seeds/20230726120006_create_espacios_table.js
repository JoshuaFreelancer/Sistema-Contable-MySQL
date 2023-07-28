exports.seed = async function(knex) {
    await knex('espacios').del();
  
    await knex('espacios').insert([
      { nombre: 'Espacio A', ubicacion: 'Piso 1', capacidad: 50 },
      { nombre: 'Espacio B', ubicacion: 'Piso 2', capacidad: 30 },
      { nombre: 'Espacio C', ubicacion: 'Piso 3', capacidad: 100 },
      { nombre: 'Espacio D', ubicacion: 'Piso 4', capacidad: 70 },
    ]);
  };
  