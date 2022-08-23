/**Ruta para la autenticación  */
const { check, body } = require('express-validator')
const { Router } = require('express')
const { validarCampos } = require('../middlewares/validarCampos')
const { authLogin, authLoginGoogle } = require('../controllers/authController')

const router = Router()

/**TODOS:
 * - Programar middlewares para cada ruta, dependiendo de lo que vaya a hacerse.
 */
router.post ('/login', authLogin)

router.post ('/google', authLoginGoogle)


module.exports = router