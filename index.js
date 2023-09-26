require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./dababase/config');

// Crear servicosr Express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json());

// Conectar la BD
dbConnection();

// Rutas
app.use( '/api/users', require('./routes/users'));
app.use( '/api/login', require('./routes/auth'));


// Levantar servidor
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto', process.env.PORT)
})


