exports.up = function (knex) {
    return knex.schema.createTable('servicios', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.text('descripcion');
      table.decimal('precio', 10, 2).notNullable();
      table.string('categoria').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('servicios');
  };
  