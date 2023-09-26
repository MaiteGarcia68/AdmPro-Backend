const jwt = require('jsonwebtoken')

const validarJWT = (req, rsp, next) => {

    // Leer el token
    const token = req.header('x-token')

    if (!token) {
        return rsp.status(401).json({
            ok: false,
            msg: 'No tiene token'
        });
    }

    try {

        const { uuid } = jwt.verify( token, process.env.JWT_SECRET);
    
        // Grabo eñ uid del usuario autentifivado en el request
        req.uid = uuid;
        next();

        
    } catch (error) {
        rsp.status(401).json({
            ok: false,
            msg: 'Error en validacion de token',
            error: error.message
        });
    }
}

module.exports = {
    validarJWT
}