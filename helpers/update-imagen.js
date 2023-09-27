const fs = require('fs')

const Doctor = require("../models/doctor")
const Hospital = require("../models/hospital")
const User = require("../models/user")

const deleteImg = ( imgOld ) => {
    if ( fs.existsSync(imgOld) ) {
        // Borrar imagen anterior
        fs.unlinkSync( imgOld);
    }
}

const updateImagen = async ( tabla, id, nombreArchivo ) => {

    console.log(tabla, id, nombreArchivo)
    let data;
    let imgOld

    switch (tabla) {
        case 'users':
            data = await User.findById(id);
            if (!data) return false;

            imgOld = `./uploads/users/${ data.img }`
            deleteImg(imgOld);
            
            data.img = nombreArchivo;
            await data.save();
            return true;

        case 'doctors':
            data = await Doctor.findById(id);
            if (!data) return false;

            imgOld = `./uploads/doctors/${ data.img }`
            deleteImg(imgOld);
            
            data.img = nombreArchivo;
            await data.save();
            return true;
            
        case 'hospitals':
            data = await Hospital.findById(id);
            console.log(data)

            if (!data) return false;

            imgOld = `./uploads/hospitals/${ data.img }`
            deleteImg(imgOld);
            
            data.img = nombreArchivo;
            await data.save();
            return true;
    
        default:
            return false;
    }

}

module.exports = {
    updateImagen
}