// migrations/20230719170000_create_libros_table.js

exports.up = function(knex) {
    return knex.schema.createTable('libros', function (table) {
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.string('autor').notNullable();
      table.string('editorial').notNullable();
      table.date('fechaPublicacion').notNullable();
      table.string('estado').notNullable();
      table.integer('cantidad').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('libros');
  };
  