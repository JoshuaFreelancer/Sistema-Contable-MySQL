exports.up = function (knex) {
    return knex.schema.createTable('facturas', function (table) {
      table.increments('id').primary();
      table.string('cliente').notNullable();
      table.string('proveedor').notNullable();
      table.string('productos').notNullable();
      table.decimal('total', 10, 2).notNullable();
      table.date('fecha').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('facturas');
  };
  