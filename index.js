const express = require( 'express' );
require( 'dotenv' ).config();
const cors = require( 'cors' );
const { dbConnection } = require( './database/config' );

//Crear el servidor de express 
const app = express();

//DB
dbConnection();

//CORS
app.use( cors() )

//Directorio publico
app.use( express.static( 'public' ) )

//Lectura y parseo del body siempre antes que las rutas
app.use( express.json() );

//Rutas
//Asi implmenteamos el middleware. El primer parametro es la ruta del endpoint y el segundo es todo lo que exporta en este caso el auth, todo lo que exporta lo habilita en la ruta
//Cuando hacemos la peticion desde postman el primer parametro lo debemos usar para llegar al endpoint. Seria asi
// api/auth/new
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/events', require( './routes/events' ) );
//CRUD

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `Sever running on ${process.env.PORT} port` );
} )