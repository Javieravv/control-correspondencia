/**Conexión a la base de datos de correspondencia creada 
 * con MySql
 */

const Sequelize = require('sequelize')
require ('dotenv').config()

const dbCorrespondencia = new Sequelize (process.env.DBNAME,
    process.env.USERDB,
    process.env.USER_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        // logging: false
    }
)

module.exports = dbCorrespondencia
