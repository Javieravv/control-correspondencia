/**Modelo para la tabla de Usuarios.
 * Se creará de acuerdo con la tabla de MySql
 */

 const DataTypes = require ('sequelize')
 const dbCorrespondencia = require ( '../database/dbCorrespondenciaConnection')
 
 const Usuario = dbCorrespondencia.define('tblUsuarios', {
     apellidosusuario: {
         type: DataTypes.STRING 
     },
     nombresusuario: {
         type: DataTypes.STRING 
     },
     correousuario: {
         type: DataTypes.STRING 
     },
     estado: {
         type: DataTypes.BOOLEAN 
     },
     password: {
        type: DataTypes.STRING 
     }
 })
 
 module.exports = Usuario
 