exports.seed = async function(knex) {
    await knex('usuarios').del();
  
    await knex('usuarios').insert([
      { id: 16, nombre: 'Patricia', clave: '$2a$10$/xQFikokNu0fX.9LJ/TLdeLplhX82VOe8sQdEX6KIDY4sC.lgLuT6', rol: 'Personal' },
      { id: 17, nombre: 'Pepe', clave: '$2a$10$.hTSUyGe/yntp2oQB2yLIO3HU4T6cXrtiibfkZkwUoUKMDoKNtAy2', rol: 'Facturador' },
      { id: 18, nombre: 'Linda', clave: '$2a$10$qfBkdF8XqqqbAT71jD0SiuLBCjD27wdeh3L37UdN3R.aeEZvtMbMq', rol: 'Contador' },
      { id: 19, nombre: 'David', clave: '$2a$10$drNInEpK9EYAyxLf65HaI.zShZl7jVEekikY1at7TWPOQjRE95ApW', rol: 'Facturador' },
      { id: 20, nombre: 'Garcia', clave: '$2a$10$j8uuKZJWWNS4pgi5UMpDVudX9QXqhvMLoxZ786zinv1jCUVsMTTRC', rol: 'Personal' },
    ]);
  };
  