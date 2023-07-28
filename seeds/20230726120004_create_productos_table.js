exports.seed = async function(knex) {
    await knex('productos').del();
  
    await knex('productos').insert([
      { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 100.00, categoria: 'Electrónica', stock: 50 },
      { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 80.00, categoria: 'Moda', stock: 30 },
      { nombre: 'Producto 3', descripcion: 'Descripción del producto 3', precio: 150.00, categoria: 'Electrónica', stock: 20 },
      { nombre: 'Producto 4', descripcion: 'Descripción del producto 4', precio: 120.00, categoria: 'Hogar', stock: 10 },
    ]);
  };
  