const { response } = require('express')
const bcrypt  = require('bcryptjs')

const Hospital = require('../models/hospital');

const getHospitals = async ( req, rsp = response ) => {

    const hospitals = await Hospital.find()
                                    .populate('user','name email')

    rsp.json({
        ok: true,
        hospitals
    })
}

const createHospital = async (req, rsp = response) => {

    const uid = req.uid
    const hospital = new Hospital( {
        user : uid,
        ... req.body });

    try {

        await hospital.save();
        
        rsp.json({
            ok: true,
            hospital
        });
    } catch (error) {
        rsp.status(500).json({
            ok: false,
            msg: 'Error al crear hospital',
            error: error.message
        });
    }

};

const updateHospital = async ( req, rsp = response ) => {

    const uuid = req.params.id
    
    try {
        
        rsp.json({
            ok: true,
            msg: 'actualizar hospital'
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

const deleteHospital = async ( req, rsp = response ) => {

    
    try {
        

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
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}
