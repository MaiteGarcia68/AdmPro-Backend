// Using Node.js `require()`
const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('BB on line')
        
    } catch (error) {
        console.log(error)
        throw new error ( 'error al iniciar la base de datos' )
        
    }

}

module.exports = {
    dbConnection
}