# Assembler School MERN Server

Servidor para la aplicación MERN.

## Pasos

### Variables de entorno

Crear un archivo `.env` en la raíz de la carpeta `/server` con las siguientes
variables:

- `MONGO_DB_URL_PRODUCTION`: URL de la base de datos de `production` de MongoDB.
- `MONGO_DB_URL_DEVELOPMENT`: URL de la base de datos de `development` de
  MongoDB.
- `MONGO_DB_URL_TEST`: URL de la base de datos de `test` de MongoDB.
- `JWT_SECRET`: El secreto usado para firmar los token JWT.
- `BCRYPT_SALT_ROUNDS`: Usado para encriptar las contraseñas. Valor numérico
  entre 10 y 12.

### Instalar dependencias

Ejecutar `npm i` o `yarn` en un terminal para instalar las dependencias

### Instalar dependencias

Ejecutar `npm run dev` o `yarn dev` en un terminal para ejecutar nuestra
applicacion.

## Autor

[Dani Lucaci](https://www.danilucaci.com/).

## License

Licensed under the [MIT License](./LICENSE).
