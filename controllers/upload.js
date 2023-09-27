const path = require('path')
const fs = require('fs')

const { response } = require('express')

const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require('../helpers/update-imagen');

const fileUpload = ( req, rsp = response ) => {

    const tabla = req.params.tabla;
    const id = req.params.id;

    // Validar tabla
    const tablasValidas = ['users', 'doctors', 'hospitals']
    if ( !tablasValidas.includes(tabla)) {
        return rsp.status(400).json({
            ok: false,
            msg: 'No existe la tabla',
            tabla,
        })
    }

    // Valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return rsp.status(400).json({
            ok:false,
            msg: 'No files were uploaded.'
        });
    }

    // Procesar la imagen
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const file = req.files.img;
    const nombreCortado = file.name.split('.'); // corta el nombre del archivo x puntos
    const extension = nombreCortado[ nombreCortado.length - 1]

    // validar extension
    const extensionesValidas = ['jpg','png','jepg','gif','JPG']
    if ( !extensionesValidas.includes(extension)) {
        return rsp.status(400).json({
            ok: false,
            msg: 'Extension no válida',
            tabla,
        })
    }

    // Generar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extension}`

    // Path para guardar archivo
    const uploadPath = `./uploads/${ tabla }/${ nombreArchivo }`;

    // Mover imagen al directorio
    file.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).json({
            ok: false,
            err
        });
    });

    // Actualizar en BD 
    const cargaImagen = updateImagen( tabla, id, nombreArchivo );
    console.log({cargaImagen})
    if  (!cargaImagen) {
        console.log('no cargo imagen')
        return res.status(500).json({
            ok: false,
            msg: 'No se actualizo la imagen'
        });
    }


    rsp.json({
        ok: true,
        msg: 'Archivo subido correctamente',
        tabla,
        id,
        nombreArchivo,
    })

}

const getImg = ( req, rsp = response ) => {

    const tabla = req.params.tabla;
    const fileName = req.params.fileName;

    let pathImg = path.join( __dirname, `../uploads/${ tabla }/${ fileName }`);

    // Imagen por defecto
    if ( !fs.existsSync(pathImg)) {
        pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
    }

    rsp.sendFile( pathImg );

}

module.exports = {
    fileUpload,
    getImg,
}