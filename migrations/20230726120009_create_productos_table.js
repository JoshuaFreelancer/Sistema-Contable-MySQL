exports.up = function (knex) {
    return knex.schema.createTable('productos', (table) => {
      table.increments('id').unsigned().primary();
      table.string('nombre').nullable();
      table.string('descripcion').nullable();
      table.decimal('precio', 10, 2).nullable();
      table.string('categoria').nullable();
      table.integer('stock').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('productos');
  };
  