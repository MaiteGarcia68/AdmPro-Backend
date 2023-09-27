/*
    Ruta: /api/hospitals
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

const router = Router();

router.get( '/', 
            [
                validarJWT, 
                getHospitals 
            ]);
router.post( '/',
             [
                validarJWT,
                check('name', 'El nombre del hospital es necesario').not().isEmpty(),
                validarCampos,
             ], 
             createHospital );
             
router.put( '/:id',
            [
                validarJWT,
                validarCampos,
            ],
            updateHospital);

router.delete( '/:id', 
                validarJWT,
                deleteHospital);


module.exports = router;

