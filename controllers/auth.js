const { response } = require('express')
const bcrypt  = require('bcryptjs')

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

}

const loginGoogle = async (req, rsp = response) => {
    
    try {

        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await User.findOne({email});

        let usuario;

        if (!usuarioDB) {
            usuario = new User( {
                email,
                name,
                img: picture,
                password: '@@@',
                google: true
            } )
        } else {
            usuario = usuarioDB
            usuario.img = picture
            usuario.google = true
            ///usuario.password = '@@@'
        }

        usuario.save()

        // Generar el token
        const token = await generarJWT(usuario.id)

        rsp.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        rsp.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto',
            error: error.message
        });
    }

};

const renewToken = async (req, rsp = response) => {

    console.log('llegue')
    const uid = req.uid

    // Generar el token
    const token = await generarJWT(uid)

    rsp.json({
        ok: true,
        token
    });

}

module.exports = {
    login,
    loginGoogle,
    renewToken,
}