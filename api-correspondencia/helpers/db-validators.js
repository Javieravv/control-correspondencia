/**Realizamos validaciones para la base de datos. */

const Usuario = require("../models/modelUsuario")

const correoExiste = async (correo) => {
    const correoBuscado = await Usuario.findOne ({
        where: {
            correousuario: correo
        }
    })

    if ( correoBuscado ) {
        return true
    } else { return false}
}

module.exports = {
    correoExiste
}