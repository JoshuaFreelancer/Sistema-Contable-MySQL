exports.up = function (knex) {
    return knex.schema.createTable('espacios', (table) => {
      table.increments('id').unsigned().primary();
      table.string('nombre').notNull();
      table.string('ubicacion').notNull();
      table.integer('capacidad').notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('espacios');
  };
  