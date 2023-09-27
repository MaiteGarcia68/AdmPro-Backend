const { response } = require('express')
const bcrypt  = require('bcryptjs')

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async ( req, rsp = response ) => {
    
    const desde = Number(req.query.desde) || 0;

    const [ users, total ] = await Promise.all([
        User.find({}, 'name email google role img')
            .skip( desde )
            .limit(2),
        User.countDocuments()
    ])

    rsp.json({
        ok: true,
        users,
        total
    })
}

const createUser = async (req, rsp = response) => {
    
    const { email, password } = req.body;
    try {
        const existeEmail = await User.findOne({ email });
        
        if (existeEmail) {
            return rsp.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya existe'
            });
        }
        
        const user = new User(req.body);
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt)

        // Guardar usuario
        await user.save();

        // Generar el token
        const token = await generarJWT(user.id)

        rsp.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        rsp.status(500).json({
            ok: false,
            msg: 'Error al crear usuario',
            error: error.message
        });
    }

};

const updateUser = async ( req, rsp = response ) => {

    const uuid = req.params.id
    
    try {
        
        const usuarioExiste = await User.findById( uuid )
    
        if (!usuarioExiste) {
            return rsp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        
        const { password, google, email, ...campos} = req.body;
        if ( usuarioExiste.email !== email ) {
            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return rsp.status(400).json({
                    ok: false,
                    msg: 'El correo electrónico ya existe'
                });
            }
        }
        campos.email = email;

        // Actualizar compas
        const usuarioActualizado = await User.findByIdAndUpdate( uuid, campos, {new: true })

        rsp.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario',
            error: error.message
        });
    }
}

const deleteUser = async ( req, rsp = response ) => {

    const uuid = req.params.id
    
    try {
        
        const usuarioExiste = await User.findById( uuid )
    
        if (!usuarioExiste) {
            return rsp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        await User.findByIdAndDelete( uuid )

        rsp.json({
            ok: true,
            msg: 'Usuario borrado correctamente'
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario',
            error: error.message
        });
    }
}



   
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}
