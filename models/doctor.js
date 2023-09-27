const { Schema, model } = require('mongoose');

const DoctorShema = Schema({

    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },

})

DoctorShema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;

})

module.exports = model( 'Doctor', DoctorShema )
