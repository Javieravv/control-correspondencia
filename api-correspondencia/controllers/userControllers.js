/**Controladores para los usuarios. */
const Usuario = require("../models/modelUsuario")
const bcryptjs = require ("bcryptjs")
const { v4: uuidv4  } = require('uuid')
const { correoExiste } = require("../helpers/db-validators")

// Traemos información de los usuarios.
const userGet = async ( req, res ) => {
    const usuarios = await Usuario.findAll({
        where: { 
            estado: 1
        }
    })
    res.json ({
        msg: 'Devolvemos el listado de usuarios registrados',
        usuarios
    })
}

const userGetUserId = async ( req, res ) => {
    const { idUsuario } = req.params
    const usuario = await Usuario.findByPk ( idUsuario )

    if ( !usuario ) {
        return res.status( 404 ).json({
            msg: `No existe un usuario con el id ${idUsuario}`
        })
    }
    res.json ({
        msg: 'Devolvemos información de un usuario',
        usuario
    })
}


/**
 * Para crear nuevo usuario tener en cuenta:
 * - Validar que no exista ese email. Si existe devolver error
 * - Encriptar la contraseña.
 * - Generar un uuid para la clave primaria
 * - Guardar el usuario
 */

const userPost = async ( req, res ) => {
    const { apellidosusuario, nombresusuario, correousuario, estado, password } = req.body
    // verificamos que el correo no esté ya registrado.
    buscarCorreo = await correoExiste (correousuario)
    if ( buscarCorreo ) {
        return res.status(400).send({
            msg: 'Este correo electrónico ya está registrado.'
        })
    }

    const usuario = new Usuario ( { apellidosusuario, nombresusuario, correousuario, estado, password } )

    // encriptamos la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync ( password, salt )

    // generamos el uuid para el usuario
    usuario.id = uuidv4()
    // console.log ( 'EL ID DEL USUARIO ES ', usuario.id )
    // res.json ({
    //     msg: 'Intentando crear el usuario',
    //     usuario
    // })
    try {
        await usuario.save ()
        res.json ({
            msg: 'Usuario creado',
            usuario
        })
    } catch (error) {
        console.log (error)
        res.status(500).json ({
            msg: 'No ha sido posible insertar el nuevo usuario',
            usuario
        })
    }
}

/**Para actualizar un usuario:
 * - Ver si el usuario existe
 * - Ver si el correo del usurio que viene en el body ya existe
 * - Grabar las actualizaciones.
 * - No actualizamos la contraseña.
 */
const userPut = async ( req, res ) => {
    const { idUsuario } = req.params
    const datosUsuario = req.body
    // buscamos si el usuario existe o no.
    const usuarioExiste = await Usuario.findByPk ( idUsuario )
    if ( !usuarioExiste ) {
        return res.status(400).json ({
            msg: `No es posible actualizar el usuario con id ${ idUsuario } porque no está registrado`
        })
    }

    // Si el usuario existe, entonces vemos que su correo no haya cambiado. Si cambió lo buscamos.
    if ( usuarioExiste.correousuario !== datosUsuario.correousuario ) {
        buscarCorreo = await correoExiste (datosUsuario.correousuario)
        if ( buscarCorreo ) {
            return res.status(400).send({
                msg: 'Este correo electrónico ya está registrado.'
            })
        }
    }

    try {
        await Usuario.update (datosUsuario, 
            {
                where: {
                    id: idUsuario
            }
        })

        res.status(201).json ({
            msg: `Se modificó adecuadamente el usuario con id ${ idUsuario }`
        })

    } catch (error) {
        console.log ( error )
        res.json ({
            msg: 'No fue posible actualizar el usuario'
        })
    }
}


// Borramos un usuario
const userDelete = async ( req, res ) => {
    const { idUsuario } = req.params

    // buscamos si el usuario existe o no.
    const usuarioExiste = await Usuario.findByPk ( idUsuario )
    if ( !usuarioExiste ) {
        return res.status(400).json ({
            msg: `No es posible eliminar el usuario con id ${ idUsuario } porque no está registrado`
        })
    }

    try {
        await Usuario.update ( { estado: 0}, 
            {
                where: {
                    id: idUsuario
            }
        })

        res.status(201).json ({
            msg: `Se eliminó adecuadamente el usuario con id ${ idUsuario }`
        })

    } catch (error) {
        console.log ( error )
        res.json ({
            msg: 'No fue posible eliminar el usuario'
        })
    }
}

module.exports = {
    userGet,
    userGetUserId,
    userPut,
    userPost,
    userDelete
}


