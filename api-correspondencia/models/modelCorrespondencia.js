/**Modelo para la tabla de Correspondencia.
 * Se creará de acuerdo con la tabla de MySql
 */

const DataTypes = require ('sequelize')
const dbCorrespondencia = require ( '../database/dbCorrespondenciaConnection')

const Correspondencia = dbCorrespondencia.define('tblCorrespondencia', {
    fechaentrada: {
        type: DataTypes.DATE
    },
    nombreorigen: {
        type: DataTypes.STRING 
    },
    totaldocumentosanexos: {
        type: DataTypes.INTEGER 
    },
    consecutivodocumentosanexos: {
        type: DataTypes.STRING 
    },
    fechadocumentoanexo: {
        type: DataTypes.DATE 
    },
    asuntomensaje: {
        type: DataTypes.TEXT 
    },
    procesodestino: {
        type: DataTypes.STRING 
    },
    observaciones: {
        type: DataTypes.TEXT
    },
    fechaanexoproceso: {
        type: DataTypes.DATE 
    },
    usuariolector: {
        type: DataTypes.STRING 
    },
    usuarioactualizaexpediente: {
        type: DataTypes.STRING 
    },
    estado: {
        type: DataTypes.BOOLEAN 
    }
})

module.exports = Correspondencia
