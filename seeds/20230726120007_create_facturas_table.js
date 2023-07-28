exports.up = function (knex) {
    return knex.schema.createTable('facturas', (table) => {
      table.increments('id').unsigned().primary();
      table.string('cliente').nullable();
      table.string('proveedor').nullable();
      table.string('productos').nullable();
      table.decimal('total', 10, 2).nullable();
      table.date('fecha').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('facturas');
  };
  