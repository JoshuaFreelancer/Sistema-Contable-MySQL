exports.up = function (knex) {
    return knex.schema.createTable('proveedores', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.string('direccion').notNullable();
      table.string('telefono').notNullable();
      table.string('correo').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('proveedores');
  };
  