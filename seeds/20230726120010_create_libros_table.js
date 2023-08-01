exports.seed = async function(knex) {
    await knex('libros').del();
  
    await knex('libros').insert([
      {
        titulo: 'Libro 1',
        autor: 'Autor 1',
        editorial: 'Editorial 1',
        fechaPublicacion: '2023-07-23',
        estado: 'Disponible',
        cantidad: 10
      },
      {
        titulo: 'Libro 2',
        autor: 'Autor 2',
        editorial: 'Editorial 2',
        fechaPublicacion: '2023-08-01',
        estado: 'Agotado',
        cantidad: 0
      },
      {
        titulo: 'Libro 3',
        autor: 'Autor 3',
        editorial: 'Editorial 3',
        fechaPublicacion: '2023-07-15',
        estado: 'Disponible',
        cantidad: 5
      },
      {
        titulo: 'Libro 4',
        autor: 'Autor 4',
        editorial: 'Editorial 4',
        fechaPublicacion: '2023-07-19',
        estado: 'Disponible',
        cantidad: 7
      },
      {
        titulo: 'Libro 5',
        autor: 'Autor 5',
        editorial: 'Editorial 5',
        fechaPublicacion: '2023-07-10',
        estado: 'Disponible',
        cantidad: 3
      },
    ]);
  };
  