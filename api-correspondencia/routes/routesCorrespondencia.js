/**Ruta temporal */
const { check, body } = require('express-validator')
const { Router } = require('express')
const {  obtenerCorrespondencia, 
         obtenerCorrespondenciaRadicado, 
         insertarCorrespondencia, 
         modificarCorrespondencia, 
         eliminarCorrespondencia } = require('../controllers/correspondenciaController')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarCamposCompletos } = require('../middlewares/validarCamposCompletos')

const router = Router()

/**TODOS:
 * - Programar middlewares para cada ruta, dependiendo de lo que vaya a hacerse.
 */
router.get ('/', obtenerCorrespondencia)

router.get ('/:radicado', obtenerCorrespondenciaRadicado)

router.post ('/', 
        [
            // validarCamposCompletos,
            check('nombreorigen', 'Debe enviarse un nombre de remitente, por favor').trim().not().isEmpty(),
            check('asuntomensaje', 'Debe escribir un asunto para el mensaje enviado').trim().not().isEmpty(),
            check('procesodestino', 'La correspondencia debe tener un proceso de destino').trim().not().isEmpty(),
            check('fechaentrada','Debe enviar una fecha de entrada válida').isDate(body('fechaentrada')),
            validarCampos
        ], 
        insertarCorrespondencia
)

router.put ('/:idCorrespondencia', modificarCorrespondencia)

router.delete ('/:idCorrespondencia', eliminarCorrespondencia)


module.exports = router