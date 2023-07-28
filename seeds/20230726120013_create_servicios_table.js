exports.up = function (knex) {
    return knex.schema.createTable('servicios', (table) => {
      table.increments('id').unsigned().primary();
      table.string('nombre').nullable();
      table.text('descripcion').nullable();
      table.decimal('precio', 10, 2).nullable();
      table.string('categoria').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('servicios');
  };
  