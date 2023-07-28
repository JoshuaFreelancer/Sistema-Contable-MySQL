exports.up = function (knex) {
    return knex.schema.createTable('productos', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.string('descripcion');
      table.decimal('precio', 10, 2).notNullable();
      table.string('categoria').notNullable();
      table.integer('stock').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('productos');
  };
  