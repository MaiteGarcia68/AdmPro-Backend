/*
    Ruta: /api/uploads
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImg } = require('../controllers/upload');

const router = Router();


router.use(expressFileUpload());

router.get( '/:tabla/:fileName', 
            getImg );
            
router.put( '/:tabla/:id', 
            [
                validarJWT
            ],
            fileUpload );


module.exports = router;