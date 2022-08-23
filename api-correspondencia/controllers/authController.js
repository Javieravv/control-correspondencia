/**Controladores para la autenciación. */

// const bcryptjs = require('bcryptjs')
const { response } = require('express')
// const { generarJWT } = require('../helpers/generarJwt')
// const { googleVerify } = require('../helpers/google-verify')
// const Usuario = require ('../models/modelUsuario')

const authLogin = async ( req, res = response) => {
    const { usuario, password } = req.body
    res.json ({
        msg: 'Autenticación del usuario.',
        usuario,
        password
    })
}

const authLoginGoogle = async ( req, res = response) => {
    res.json ({
        msg: 'Autenticación con Google'
    })
}

module.exports = {
    authLogin,
    authLoginGoogle
}
