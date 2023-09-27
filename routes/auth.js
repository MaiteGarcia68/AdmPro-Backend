/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { login, loginGoogle } = require('../controllers/auth');

const router = Router();
 
router.post( '/',
             [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password es Obligatorio').not().isEmpty(),
                validarCampos,
             ], 
             login );

router.post( '/google/',
             [
                check('token', 'El token es obligatorio').not().isEmpty(),
                validarCampos,
             ], 
             loginGoogle );
             

module.exports = router;

