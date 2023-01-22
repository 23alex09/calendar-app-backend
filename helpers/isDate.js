const moment = require( 'moment' )
//Estos argumentos siempre vienen cuando estamos creando una validacion personalizada de express-validator
//Tendriamos toda la info referente a la request pero desectruturamos unicamente los que nos interesan
const isDate = ( value, { req, location, path } ) => {

    if ( !value ) return false;

    const date = moment( value );
    if ( date.isValid() ) return true;
    else return false;

}


module.exports = {
    isDate
}