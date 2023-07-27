var mysql = require('mysql');
const dotenv = require('dotenv');

// Configuración de la conexión a MySQL
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
  
  // Verifica la conexión
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
      return;
    }
    console.log('Conexión a la base de datos establecida.' + connection.threadId);
  });
  
module.exports = connection;