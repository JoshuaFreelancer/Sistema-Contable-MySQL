exports.up = function (knex) {
  return knex.schema.createTable('usuarios', function (table) {
    table.increments('id').primary();
    table.string('nombre', 25).notNullable();
    table.string('clave', 100).notNullable();
    table.enum('rol', ['Facturador', 'Contador', 'Personal']).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios');
};
