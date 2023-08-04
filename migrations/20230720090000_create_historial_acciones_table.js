// migrations/20230720090000_create_historial_acciones_table.js
exports.up = function (knex) {
  return knex.schema.createTable('historial_acciones', function (table) {
    table.increments('id').primary();
    table.integer('usuario_id').notNullable();
    table.string('ruta').notNullable();
    table.string('tipo_consulta').notNullable();
    table.timestamp('fecha_hora').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('historial_acciones');
};

