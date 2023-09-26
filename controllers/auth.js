const { response } = require('express')
const bcrypt  = require('bcryptjs')

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async ( req, rsp = response ) => {

    const users = await User.find({}, 'name email google role');

    rsp.json({
        ok: true,
        users
    })
}

const login = async (req, rsp = response) => {
    
    const { email, password } = req.body;

    try {
    
        const usuarioExiste = await User.findOne({ email })
    
        // verificar email
        if (!usuarioExiste) {
            return rsp.status(404).json({
                ok: false,
                msg: 'Usuario no valido -- email'
            });
        }
        // Verificar contraneña
        const validPassword = bcrypt.compareSync( password, usuarioExiste.password )

        if (!validPassword) {
            return rsp.status(404).json({
                ok: false,
                msg: 'Usuario no valido -- pass'
            });
        }

        // Generar el token
        const token = await generarJWT(usuarioExiste.id)
        

        rsp.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al crear usuario',
            error: error.message
        });
    }

};

module.exports = {
    login,
}