exports.up = function (knex) {
    return knex.schema.createTable('empleados', function (table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
      table.string('direccion').notNullable();
      table.string('telefono').notNullable();
      table.string('correo').notNullable();
      table.string('puesto').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('empleados');
  };
  