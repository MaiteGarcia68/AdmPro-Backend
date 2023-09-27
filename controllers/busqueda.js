const { response } = require('express')

const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')

const getAll = async ( req, rsp = response ) => {

    const termBusqueda = req.params.termBusqueda
    const regex = new RegExp( termBusqueda, 'i' )

    const [ usuarios, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex }),
    ])

    rsp.json({
        ok: true,
        usuarios,
        hospitals,
        doctors,
        termBusqueda,
    })
}

const getcolection = async ( req, rsp = response ) => {

    const tabla = req.params.tabla
    const termBusqueda = req.params.termBusqueda
    const regex = new RegExp( termBusqueda, 'i' )
    let data = []

    switch (tabla) {
        case "user":
            data = await User.find({ name: regex }); 
            break;
    
        case "doctor":
            data = await Doctor.find({ name: regex })
                                .populate('user','name email')
                                .populate('hospital','name');
            break;
    
        case "hospital":
            data = await Hospital.find({ name: regex })
                                .populate('user','name email');
            break;
    
        default:
            return rsp.status(400).json({
                ok: false,
                msg: 'La tabla no existe'
            });
    }

    rsp.json({
        ok: true,
        data,
        tabla,
        termBusqueda,
    })
}

module.exports = {
    getAll,
    getcolection,
}