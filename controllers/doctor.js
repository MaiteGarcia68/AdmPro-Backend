const { response } = require('express')
const bcrypt  = require('bcryptjs')

const Doctor = require('../models/doctor');

const getDoctors = async ( req, rsp = response ) => {

    const doctors = await Doctor.find()
                                .populate('user','name email')
                                .populate('hospital','name')

    rsp.json({
        ok: true,
        doctors
    })
}

const createDoctor = async (req, rsp = response) => {
    
    const uid = req.uid
    const doctor = new Doctor( {
        user : uid,
        ... req.body });

    try {

        await doctor.save();

        rsp.json({
            ok: true,
            doctor
        });
    } catch (error) {
        rsp.status(500).json({
            ok: false,
            msg: 'Error al crear hospital',
            error: error.message
        });
    }

};

const updateDoctor = async ( req, rsp = response ) => {

    
    try {
        
        rsp.json({
            ok: true,
            msg: 'actualizar doctor'
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al actualizar doctor',
            error: error.message
        });
    }
}

const deleteDoctor = async ( req, rsp = response ) => {

    
    try {
        

        rsp.json({
            ok: true,
            msg: 'doctor borrado correctamente'
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al actualizar doctor',
            error: error.message
        });
    }
}



   
module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}
