
/*
    Rutas de Usuario / Auth

    host + /api/auth

*/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' )
const { createUser, loginUser, revalidateToken } = require( '../controllers/auth' );
const { validateFields } = require( '../middlewares/fields-validator' );
const { validateJWT } = require( '../middlewares/validate-jwt' );

const router = Router();

router.post(
    '/new',
    [//middlewares, se ejecutan secuencial y al final el controlador
        check( 'name', 'Name is mandatory' ).not().isEmpty(),
        check( 'email', 'Email is mandatory' ).isEmail(),
        check( 'password', 'Password should contain six characters' ).isLength( { min: 6 } ),
        validateFields
    ],//Controlador
    createUser
);

router.post(
    '/',
    [
        check( 'email', 'Email is mandatory' ).isEmail(),
        check( 'password', 'Password should contain six characters' ).isLength( { min: 6 } ),
        validateFields
    ],
    loginUser
);

router.get( '/renew',
    [
        validateJWT
    ],
    revalidateToken );

//exportacion de node
module.exports = router;