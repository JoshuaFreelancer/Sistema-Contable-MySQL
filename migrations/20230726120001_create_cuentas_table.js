exports.up = function (knex) {
  return knex.schema.createTable('cuentas', function (table) {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('descripcion').nullable();
    table.string('serial').notNullable();
    table.date('fechaAdquisicion').notNullable();
    table.string('estado').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cuentas');
};
