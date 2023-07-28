exports.up = function (knex) {
    return knex.schema.createTable('espacios', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.string('ubicacion').notNullable();
      table.integer('capacidad').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('espacios');
  };
  