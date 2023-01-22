const { Schema, model } = require( 'mongoose' );

//Asi es como va a lucir el usuario en la base de datos
const UserSchema = Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
} )

module.exports = model( 'User', UserSchema );