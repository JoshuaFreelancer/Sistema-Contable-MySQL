exports.up = function (knex) {
    return knex.schema.createTable('cuentas', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.decimal('saldo', 10, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('cuentas');
  };
  