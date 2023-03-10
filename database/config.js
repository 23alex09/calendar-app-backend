const mongoose = require( 'mongoose' );

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
        } );

        console.log( 'DB online' );
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error trying to connect db' );
    }
}

module.exports = {
    dbConnection,
}