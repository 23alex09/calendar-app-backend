/*
    Rutas de Eventos

    host + /api/events

*/

const { Router } = require( "express" );
const { check } = require( "express-validator" );
const { createEvent, getEvents, updateEvent, deleteEvent } = require( "../controllers/events" );
const { isDate } = require( "../helpers/isDate" );
const { validateFields } = require( "../middlewares/fields-validator" );
const { validateJWT } = require( "../middlewares/validate-jwt" );

const router = Router();


//todas las peticiones tienen que pasar por la validacion del JWT, como lo tenemos que hacer en todas, lo hacemos de la siguiente manera:
router.use( validateJWT )
//De aqui para abajo todas las peticiones pasaran por esta validacion pero si hubiera una encima no pasaria por la validacion

// Obtener eventos
router.get(
    '/',
    getEvents
);

//Crear nuevo evento
router.post(
    '/',
    [
        check( 'title', 'Title is mandatory' ).not().isEmpty(),
        check( 'start', 'Start date is mandatory' ).custom( isDate ),
        check( 'end', 'End date is mandatory' ).custom( isDate ),
        validateFields
    ],
    createEvent
);

//Actualizar evento
router.put(
    '/:id',
    updateEvent
);

//Borrar evento
router.delete(
    '/:id',
    deleteEvent
);


module.exports = router;