/**Contorlador de prueba */
const { Op } = require ('sequelize')
const { response } = require('express')
const Correspondencia = require('../models/modelCorrespondencia')

/**Con este end point podemos hacer diferentes consultas, de acuerdo con los parámetros 
 * que vengan.json
 * Puede ser por :
 * - Todos los registros
 * - Una fecha determinada
 * - Un rango de fechas
 * - Por nombre del remitente de la correspondencia
 * - Por asunto del mensaje
 */
const obtenerCorrespondencia = async ( req, res = response ) => {
    const datosconsulta = req.body
    let objConsulta = {}
    switch (datosconsulta.tipoconsulta) {
        case 'general':
            break;
        case 'fecha':
            objConsulta = {
                fechaentrada: new Date (datosconsulta.fecha)
            }
            break;            
        case 'remitente':
            objConsulta = {
                nombreorigen: {
                    [Op.substring]: datosconsulta.nombreorigen
                }
            }
            break;
        case 'rangofechas':
            objConsulta = {
                fechaentrada: {
                    [Op.between]: [new Date (datosconsulta.fecha1), new Date (datosconsulta.fecha2)]
                }
            }
            break;
        case 'asunto-observaciones':
            objConsulta = {
                [Op.or]: [
                    {
                        asuntomensaje: {
                            [Op.substring]: datosconsulta.textobusqueda
                        }
                    },
                    {
                        observaciones: {
                            [Op.substring]: datosconsulta.textobusqueda
                        }
                    }
                ]
            }
            break
        default:
            break;
    }

    const correspondencia = await Correspondencia.findAll({ 
        where: objConsulta
    })
    
    res.json ({
        msg: 'Obtención de correspondencia general',
        correspondencia
    })
}

const obtenerCorrespondenciaRadicado = async ( req, res = response) => {
    const { radicado } = req.params
    const objConsulta = {procesodestino: radicado }
    const correspondencia = await Correspondencia.findAll({ 
        where: objConsulta
    })
    
    res.json ({
        msg: 'Obtención de correspondencia por radicado',
        correspondencia
    })
}


const insertarCorrespondencia = async ( req, res = response) => {
    // Esta validación puede hacerse en un middleware
    const datosCorrespondencia = req.body

    if ( datosCorrespondencia.fechadocumentoanexo === '') {
        datosCorrespondencia.fechadocumentoanexo = null
    }
    if ( datosCorrespondencia.usuarioactualizaexpediente === '') {
        datosCorrespondencia.usuarioactualizaexpediente = null
    }

    try {
        const correspondencia = new Correspondencia (datosCorrespondencia)
        // TODO: Realizar las validaciones a que haya lugar.
        await correspondencia.save()
        res.status(200).json({
            msg: 'Correspondencia insertada con éxito',
            correspondencia
        })
    } catch (err) {
        console.log (err)
        res.status(500).json ({
            msg: 'No ha sido posible insertar la correspondencia. Se presentó un error inesperado.'
        })
    }
}

const modificarCorrespondencia = async ( req, res = response) => {
    const { idCorrespondencia } = req.params
    console.log ('SE PRETENDE MODIFICAR EL REGISTRO ', idCorrespondencia)
    // Esta validación puede hacerse en un middleware
    const datosCorrespondencia = req.body
    if ( datosCorrespondencia.fechadocumentoanexo === '') {
        datosCorrespondencia.fechadocumentoanexo = null
    }
    if ( datosCorrespondencia.usuarioactualizaexpediente === '') {
        datosCorrespondencia.usuarioactualizaexpediente = null
    }

    try {
        // Buscamos el registro de la correspondencia y si se encuentra se modifica.
        const correspondencia = await Correspondencia.findByPk ( idCorrespondencia )
        if (!correspondencia) {
            return res.status(404).json ({
                msg: `No esiste el registro ${idCorrespondencia} que se pretende modificar`
            })
        }
        await correspondencia.update ( datosCorrespondencia )
        res.json ({
            msg: 'Registro modificado',
            correspondencia

        })
    } catch (error) {
        console.log (error)
        res.status(500).json ({
            msg: `No fue posible actualizar la correspondencia con id ${ idCorrespondencia }`
        })
    }
}

/**No se elimina físicamente de la tabla. Se cambia su estadode 1 a 0 */
const eliminarCorrespondencia = async ( req, res = response) => {
    const { idCorrespondencia } = req.params

    try {
        // Buscamos el registro de la correspondencia y si se encuentra se modifica.
        const correspondencia = await Correspondencia.findByPk ( idCorrespondencia )
        if (!correspondencia) {
            return res.status(404).json ({
                msg: `No esiste el registro ${idCorrespondencia} que se pretende eliminar`
            })
        }
        await correspondencia.update ( { estado: 0} )
        res.json ({
            msg: 'Registro eliminado',
            correspondencia

        })
    } catch (error) {
        console.log (error)
        res.status(500).json ({
            msg: `No fue posible eliminar la correspondencia con id ${ idCorrespondencia }`
        })
    }
}


module.exports = {
    obtenerCorrespondencia,
    obtenerCorrespondenciaRadicado,
    insertarCorrespondencia,
    modificarCorrespondencia,
    eliminarCorrespondencia,
}