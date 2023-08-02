exports.seed = async function (knex) {
    await knex('empleados').del();
  
    await knex('empleados').insert([
      { nombre: 'Empleado 1', direccion: 'Dirección 1', telefono: '111111111', correo: 'empleado1@example.com', puesto: 'Gerente' },
      { nombre: 'Empleado 2', direccion: 'Dirección 2', telefono: '222222222', correo: 'empleado2@example.com', puesto: 'Supervisor' },
      { nombre: 'Empleado 3', direccion: 'Dirección 3', telefono: '333333333', correo: 'empleado3@example.com', puesto: 'Analista' },
      { nombre: 'Empleado 4', direccion: 'Dirección 4', telefono: '444444444', correo: 'empleado4@example.com', puesto: 'Asistente' },
    ]);
  };
  