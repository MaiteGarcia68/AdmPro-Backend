/*
    Ruta: /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor');

const router = Router();

router.get( '/', 
            [
                validarJWT, 
                getDoctors 
            ]);
router.post( '/',
             [
                validarJWT,
                check('name', 'El nombre del doctor es necesario').not().isEmpty(),
                check('hospital', 'El hospital debe ser valido').isMongoId(),
                validarCampos,
             ], 
             createDoctor );
             
router.put( '/:id',
            [
                validarJWT,
                check('name', 'El nombre del doctor es necesario').not().isEmpty(),
                check('hospital', 'El hospital debe ser valido').isMongoId(),
                validarCampos,
            ],
            updateDoctor);

router.delete( '/:id', 
                validarJWT,
                deleteDoctor);


module.exports = router;

