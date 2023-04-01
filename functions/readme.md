
# Scripts

## Crear BD
    npm run db:create

## Ejecutar las migraciones (crea las tablas en la bd)
    npm run migrate


También puedes correr el siguiente script para crear la bd y aplicar las migraciones.
    npm run db


# Cargar la data inicial
    Para activar la carga inicial, habilitar el código startupDB.loadDataInitial(); en el archivo index.js


# Levantar los servicios
    npm run dev 

Los servicios con npm run dev se ejecuta con <h4>nodemon</h4>, si se hace un cambio en el backend, detecta el cambio y se actualiza sin necesidad de detener al app y volver a levantar los servicios.


# RestClient id = humao.rest-client
Agregar la extenxión RestClient con id humao.rest-client, funciona con los archivos 
.http dentro de la carpeta restClient

Siempre que hay un cambio en la base de datos se debe de correr el scrip npm run migrate.

