/**Validamos que no haya ningun problema con los campos que deben insertarse,
 * modificarse o consultarse
 */
const { validationResult } = require ('express-validator')

const validarCampos = ( req, res, next ) => {
    const errors = validationResult ( req )
    console.log ('ERRORES DE LA VALIDACION ',errors) 
    if ( !errors.isEmpty() ) {
        return res.status(400).json( errors )
    }
    console.log ('AQUI IREMOS TODO BIEN....')   
    next ()
}

module.exports = {
    validarCampos
}