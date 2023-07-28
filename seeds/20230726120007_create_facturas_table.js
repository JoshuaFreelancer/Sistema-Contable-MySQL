exports.seed = async function(knex) {
    await knex('facturas').del();
  
    await knex('facturas').insert([
      { id: 1, cliente: 'Jaimito', proveedor: 'Proveedor 1', productos: 'nombre: Producto 1 / precio: 100, nombre: Producto 2 / precio: 200', total: 300.00, fecha: '2023-07-15' },
      { id: 2, cliente: 'Rosa', proveedor: 'Proveedor 2', productos: 'nombre: Producto 1 / precio: 150, nombre: Producto 2 / precio: 300', total: 400.00, fecha: '2023-07-16' },
      { id: 4, cliente: 'Laura', proveedor: 'Proveedor 3', productos: 'nombre: Producto 1 / precio: 145, nombre: Producto 2 / precio: 50', total: 200.00, fecha: '2023-07-18' },
    ]);
  };
  