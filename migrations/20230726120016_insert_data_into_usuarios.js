exports.up = function (knex) {
    return knex('usuarios').insert([
      { nombre: 'Patricia', clave: '$2a$10$/xQFikokNu0fX.9LJ/TLdeLplhX82VOe8sQdEX6KIDY4sC.lgLuT6', rol: 'Personal' },
      { nombre: 'Pepe', clave: '$2a$10$.hTSUyGe/yntp2oQB2yLIO3HU4T6cXrtiibfkZkwUoUKMDoKNtAy2', rol: 'Facturador' },
      { nombre: 'Linda', clave: '$2a$10$qfBkdF8XqqqbAT71jD0SiuLBCjD27wdeh3L37UdN3R.aeEZvtMbMq', rol: 'Contador' },
      { nombre: 'David', clave: '$2a$10$drNInEpK9EYAyxLf65HaI.zShZl7jVEekikY1at7TWPOQjRE95ApW', rol: 'Facturador' },
      { nombre: 'Garcia', clave: '$2a$10$j8uuKZJWWNS4pgi5UMpDVudX9QXqhvMLoxZ786zinv1jCUVsMTTRC', rol: 'Personal' },
    ]);
  };
  
  exports.down = function (knex) {
    return knex('usuarios').del();
  };
  