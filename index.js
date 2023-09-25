require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./dababase/config');

// Crear servicosr Express
const app = express();

// Configurar CORS
app.use( cors() );

// Conectar la BD
dbConnection();

console.log(process.env)

// Rutas
app.get( '/', ( req, rsp ) => {

    rsp.json({
        ok: true,
        msg: 'Hola Mundo'
    })

});

// Levantar servidor
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto', process.env.PORT)
})


