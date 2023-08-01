exports.seed = async function(knex) {
    await knex('almacen').del();
  
    await knex('almacen').insert([
      { nombre: 'Producto 1', descripcion: 'Descripción del Producto 1', codigo: 'COD-001', fechaIngreso: '2023-07-23', estado: 'A la espera', motivo: 'Nuevo producto', cantidad: 100 },
      { nombre: 'Producto 2', descripcion: 'Descripción del Producto 2', codigo: 'COD-002', fechaIngreso: '2023-08-15', estado: 'En uso', motivo: 'Reemplazo de inventario', cantidad: 50 },
      { nombre: 'Producto 3', descripcion: 'Descripción del Producto 3', codigo: 'COD-003', fechaIngreso: '2023-07-19', estado: 'A la espera', motivo: 'Promoción especial', cantidad: 200 },
      { nombre: 'Producto 4', descripcion: 'Descripción del Producto 4', codigo: 'COD-004', fechaIngreso: '2023-07-30', estado: 'A la espera', motivo: 'Devolución de cliente', cantidad: 30 },
      { nombre: 'Producto 5', descripcion: 'Descripción del Producto 5', codigo: 'COD-005', fechaIngreso: '2023-07-25', estado: 'En uso', motivo: 'Muestra para exhibición', cantidad: 10 }
    ]);
  };
  