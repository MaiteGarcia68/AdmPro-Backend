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

    const id = req.params.id
    console.log(id)
    
    try {

        const doctor = await Doctor.findById(id)

        console.log('doctor', doctor)
        if (!doctor) {
            return rsp.status(500).json({
                ok: false,
                msg: 'id no existe',
                id
            });
        }
        doctor.name = req.body.name
        doctor.hospital = req.body.hospital
        await doctor.save()

        rsp.json({
            ok: true,
            doctor
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al actualizar doctor',
            error: error.message,
            id
        });
    }
}

const deleteDoctor = async ( req, rsp = response ) => {

    const id = req.params.id
    
    try {
        const doctor = await Doctor.findById(id)

        if (!doctor) {
            return rsp.status(500).json({
                ok: false,
                msg: 'id no existe',
                id
            });
        }
        await Doctor.findByIdAndDelete(id)

        rsp.json({
            ok: true,
            msg: 'Registro eliminado'
        })
        
    } catch (error) {
        console.log(error);
        rsp.status(500).json({
            ok: false,
            msg: 'Error al eliminar doctor',
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
