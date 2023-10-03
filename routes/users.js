/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_or_Me } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
            [
                validarJWT,
                validarADMIN_ROLE
            ], 
            getUsers );
            
router.post( '/',
             [
                check('name', 'El name es obligatorio').not().isEmpty(),
                check('password', 'El password es Obligatorio').not().isEmpty(),
                check('email', 'El email debe ser un email valido').isEmail(),
                validarCampos,
             ], 
             createUser );
             
router.put( '/:id',
            [
                validarJWT,
                validarADMIN_ROLE_or_Me,
                check('name', 'El name es obligatorio').not().isEmpty(),
                check('email', 'El email debe ser un email valido').isEmail(),
                validarCampos,
            ],
            updateUser,);

router.delete( '/:id', 
                [
                    validarJWT,
                    validarADMIN_ROLE,
                ],
                deleteUser);


module.exports = router;

