const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

const validarADMIN_ROLE = async (req, rsp, next) => {

    const uid = req.uid;

    try {
        const user = await User.findById( uid );

        if (!user) {
            return rsp.status(404).json({
                ok: false,
                msg: 'User No existe'
            });
        };
        
        if ( user.role !== 'ADMIN_ROLE') {
            return rsp.status(403).json({
                ok: false,
                msg: 'No es Administrador'
            });
        };

        next();
        
    } catch (error) {
        console.log(error)
        rsp.status(500).json({
            ok: false,
            msg: 'No tiene Rol de Administrador',
            error: error.message
        });
    }

}

const validarADMIN_ROLE_or_Me = async (req, rsp, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const user = await User.findById( uid );

        if (!user) {
            return rsp.status(404).json({
                ok: false,
                msg: 'User No existe'
            });
        };

        if ( uid === id || user.role === 'ADMIN_ROLE') {
            next()
        } else {
            return rsp.status(403).json({
                ok: false,
                msg: 'No es Administrador'
            });
        }
        

    } catch (error) {
        console.log(error)
        rsp.status(500).json({
            ok: false,
            msg: 'No tiene Rol de Administrador',
            error: error.message
        });
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_or_Me,
}