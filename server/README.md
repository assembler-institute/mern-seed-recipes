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

### Ejecutar el servidor

Ejecutar `npm run dev` o `yarn dev` en un terminal para ejecutar nuestra
applicacion.

### Rellenar la base de datos con información

En el fichero `index.js` de la carpeta `server` podéis comentar las siguientes
líneas para ejecutar las funciones que rellenan la base de datos con
información.

```
// await dropCollections();
// await seed();
```

### Testing

Para ejecutar los tests unitarios / de integracion seran necesarios los
siguientes pasos:

#### Instalar mongodb

Asegurate de que [mongodb](https://www.mongodb.com/) esta instalado en tu
equipo. Puedes descargarlo
[aqui](https://www.mongodb.com/try/download/community)

#### Colocar mongo como variables de entorno

Mongo deberia estar instalado en `C:\Program Files\MongoDB\Server\4.4\bin`

Deberas crear una nueva variable de entorno que apunte allí.

De manera alternativa puedes utilizar `powershell`:

`setx mongo "C:\Program Files\MongoDB\Server\4.4\bin"`

Al escribir `mongo` en una terminal deberas ver la consola de mongo. Con esto
sabras que ya tienes mongo instalado y en el path.

#### Lanzar los tests

En una terminal ejecuta `npm run test` o `npm test`.

Para ejecutar los tests mientras programas, utiliza `npm run test:watch`.

## Autor

[Dani Lucaci](https://www.danilucaci.com/).

## License

Licensed under the [MIT License](./LICENSE).
