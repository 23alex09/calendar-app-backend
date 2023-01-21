const { response } = require( 'express' );
const { validationResult } = require( 'express-validator' );
const bcrypt = require( 'bcryptjs' );
const User = require( '../models/User' );
const { generateJWT } = require( '../helpers/jwt' );

const createUser = async ( req, res = response ) => {

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne( { email: email } );

        if ( user ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'An user already exists with this email'
            } );
        }

        user = new User( req.body );
        //Generar JWT
        const token = await generateJWT( user.id, user.name );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( user.password, salt );

        await user.save();

        res.status( 201 ).json( {
            ok: true,
            uid: user.id,
            name: user.name,
            token
        } )
    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'There was a problem, pls talk to your db admin'
        } )
    }
}

const loginUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email: email } );

        if ( !user ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'Wrong user'
            } );
        }

        //Confirmar pass
        const validPass = bcrypt.compareSync( password, user.password );
        if ( !validPass ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'Wrong password'
            } );
        }

        const token = await generateJWT( user.id, user.name );

        res.json( {
            ok: true,
            uid: user.id,
            name: user.name,
            token
        } )
    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'There was a problem, pls talk to your db admin'
        } )
    }

}

const revalidateToken = async ( req, res = response ) => {

    const { uid, name } = req;

    //genarar nuevo token
    const token = await generateJWT( uid, name );

    res.json( {
        ok: true,
        uid,
        name,
        token
    } )

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
};