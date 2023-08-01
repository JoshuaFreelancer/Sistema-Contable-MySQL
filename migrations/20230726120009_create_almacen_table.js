exports.up = function (knex) {
    return knex.schema.createTable('almacen', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.string('descripcion').nullable();
      table.string('codigo').notNullable();
      table.date('fechaIngreso').notNullable();
      table.string('estado').notNullable();
      table.string('motivo').nullable();
      table.integer('cantidad').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('almacen');
  };
  