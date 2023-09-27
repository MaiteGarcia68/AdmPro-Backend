/*
    Ruta: /api/todo
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getAll, getcolection } = require('../controllers/busqueda');

const router = Router();

router.get( '/:termBusqueda', 
            [
                validarJWT
            ],
            getAll );

router.get( '/coleccion/:tabla/:termBusqueda', 
            [
                validarJWT
            ],
            getcolection );


module.exports = router;