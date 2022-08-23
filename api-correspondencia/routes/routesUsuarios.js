/**Por ejemplo rutas relacionadas con los usuarios. */

const { Router } = require ('express')
const { check } = require('express-validator')
const { userGet, userGetUserId, userPut, userPost, userDelete } = require('../controllers/userControllers')
// const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')
// const { validarCampos, tieneRole, validarJWT } = require ('../middlewares')


const router = Router()

// en el router se configuran las rutas
router.get('/',  userGet)

// Traemos un usuario determinado|
router.get('/:idUsuario',  userGetUserId)



router.put('/:idUsuario', userPut)


// los middlewares van a la mitad de la configuración
// Aquí colocamos las validaciones
router.post('/', userPost)

// Borrar un usuario
// para borrar debe estar la ruta protegida con un JWT. Se usa un middleware
router.delete('/:idUsuario',userDelete)

module.exports = router;