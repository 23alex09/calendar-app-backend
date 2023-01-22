const { Schema, model } = require( 'mongoose' );

//Asi es como va a lucir el usuario en la base de datos
const EventSchema = Schema( {
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        //Se esta manera decimos que el tipo es una referencia
        type: Schema.Types.ObjectId,
        //Y en ref hacemos referencia al otro esquema en este caso User
        ref: 'User',
        required: true,
    }
} )

EventSchema.method( 'toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
} )

module.exports = model( 'Event', EventSchema );