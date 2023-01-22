const { response } = require( 'express' );
const Event = require( '../models/Event' )

const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventDB = await event.save();
        res.json( {
            ok: true,
            event: eventDB
        } )

    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Talk to the admin'
        } )
    }

}

const getEvents = async ( req, res = response ) => {


    try {
        //Con pupulate añadimos la info a la que apunta la refenrencia que tenemos del user
        const events = await Event.find()
            .populate( 'user', 'name' );


        res.json( {
            ok: true,
            events
        } )
    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Talk to the admin'
        } )
    }


}

const updateEvent = async ( req, res = response ) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Event not found'
            } )
        }

        if ( event.user.toString() !== req.uid ) {
            return res.status( 401 ).json( {
                ok: false,
                msg: 'You cannot edit this event'
            } )
        }

        const eventUpdated = {
            ...req.body,
            user: req.uid
        }

        const eventDB = await Event.findByIdAndUpdate( eventId, eventUpdated, { new: true } );
        res.status( 200 ).json( {
            ok: true,
            event: eventDB
        } )

    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Talk to the admin'
        } )
    }
}

const deleteEvent = async ( req, res = response ) => {


    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Event not found'
            } )
        }

        if ( event.user.toString() !== req.uid ) {
            return res.status( 401 ).json( {
                ok: false,
                msg: 'You cannot remove this event'
            } )
        }

        await Event.findByIdAndRemove( eventId );
        res.status( 200 ).json( {
            ok: true,
        } )

    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Talk to the admin'
        } )
    }
}

module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
}


