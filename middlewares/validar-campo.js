const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = ( req, rsp = response, next ) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return rsp.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos,
}

