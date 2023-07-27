exports.up = function (knex) {
    return knex.schema.createTable('clientes', (table) => {
      table.increments('id').unsigned().primary();
      table.string('nombre').notNull();
      table.string('direccion').notNull();
      table.string('telefono').notNull();
      table.string('correo').notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('clientes');
  };
  