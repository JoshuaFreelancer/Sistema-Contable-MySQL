exports.up = function (knex) {
    return knex.schema.createTable('cuentas', (table) => {
      table.increments('id').unsigned().primary();
      table.string('nombre').notNull();
      table.string('descripcion').nullable();
      table.string('serial').notNull();
      table.date('fechaAdquisicion').notNull();
      table.string('estado').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cuentas');
  };
  