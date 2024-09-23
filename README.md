# Pasos para el despliegue del proyecto Sistema Contable MySQL en Visual Studio Code:

1. Clonar el Repositorio:
   - Abre Visual Studio Code.
   - Ve al menú "View" y selecciona "Command Palette" o presiona `Ctrl + Shift + P`.
   - Escribe "Git: Clone" y selecciona la opción.
   - Ingresa la URL del repositorio: "URL DEL REPOSITORIO".git
   - Selecciona una carpeta local para clonar el proyecto.
   - Espera a que se complete la clonación.

2. Abrir el Proyecto en Visual Studio Code:
   - En Visual Studio Code, ve al menú "File" y selecciona "Open Folder".
   - Selecciona la carpeta donde clonaste el repositorio y haz clic en "Abrir".
   - La aplicación está subida a otra rama llamada “master” para acceder a ella, pulsa el botón de la imagen que está en la zona inferior izquierda de VS.
   - Luego selecciona la rama “Master” y se cargarán los archivos del repositorio.

3. Instalar Dependencias:
   - Abre la terminal en Visual Studio Code. Ve al menú "Terminal" y selecciona "New Terminal" o presiona `Ctrl + Shift + ñ` y abre la terminal Command Prompt.
   - Ejecuta el siguiente comando para instalar las dependencias del proyecto:
     ```
     npm install
     ```

4. Configuración de la Base de Datos:
   - Accede a MySQL phpMyAdmin en tu gestor de base de datos local, puedes usar tanto Wampserver como Xampp.
   - Actualiza los valores de host, user, password y database con los datos de tu conexión a la base de datos.
   - Crea una nueva base de datos de nombre "sistema_contable".
   - Dentro de la carpeta del proyecto, crea un archivo llamado "knexfile.js" con la siguiente configuración:

```javascript
module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',	   
        user: 'root',     // Cambiar por su nombre de usuario 
        password: 'contraseña', // Cambiar por una contraseña segura
        database: 'sistema_contable',
      },
      migrations: {
        directory: './migrations', 
        seeds: {
          directory: './seeds', // Use si desea tablas con datos de cada entidad
        },
      },
    },
};
```

5. Ejecutar Migraciones:
   - En la terminal Command Prompt, ejecuta el siguiente comando para aplicar las migraciones a la base de datos:

```
npm run migrate
```

6. Cargar Datos Iniciales (opcional):
   - Si deseas cargar datos iniciales en la base de datos, ejecuta el siguiente comando:

```
npm run seed
```

7. Iniciar el Servidor:
   - En la terminal, ejecuta el siguiente comando para iniciar el servidor:

```
npm start
```

8. Acceder a la Aplicación:
   - Abre tu navegador web y visita [http://localhost:3000] para acceder a la aplicación "Sistema Contable" y ver el mensaje de bienvenida.

## Notas Adicionales:
- Asegúrate de configurar correctamente las variables de entorno en un archivo `.env` en la carpeta principal proyecto para asi establecer la conexión con el servidor y además almacenar las credenciales y datos sensibles, como claves secretas o tokens JWT.

Ejemplo de archivo `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=contraseña
DB_DATABASE=sistema_contable
JWT_SECRET=estopsecret
```

- Recuerda que el archivo `.env` no debe incluirse en el repositorio, ya que contiene información confidencial.

- Para realizar pruebas, puedes crear diferentes usuarios con distintos roles en la base de datos. Puedes utilizar las rutas de registro e inicio de sesión en la aplicación para crear nuevos usuarios con roles diferentes.

---

## ¡Entidades nuevas! (libros, almacén, empleados) CRUD

## Mejoras:

Mejora N1 - Código más limpio y fácil de leer.

- Se han hecho cambios en la estructura del código de ejemplo (renombrado archivos de en seeds).

Mejora N2 - ¡Solución del error "puerto se encuentra en uso" y otras correcciones menores!

- Para solucionar el problema se ha borrado la carpeta "Bin" que establecía el puerto primero que app.js y se ha modificado package.json para llamar a app.js directamente con el comando "npm start".

Mejora N3 - Se ha agregado una nueva ruta para consultar preguntas e información a la base de datos.

- Esta ruta está disponible para todos los tipos de rol y no requiere autenticación. La ruta es "api/ayuda", ahora no será necesario consultar el informe para saber qué rutas se pueden escribir.

Mejora N4 - Estilos CSS para los archivos EJS

- Una nueva aplicacion con una apariencia más profesional.

Mejora N5 - Historial de acciones solo disponible para usuarios autenticados

- Para consultar usar GET en la ruta "api/historial", tenga en cuenta que hasta la acción de ver el historial será registrada.
