/**Servidor para manejar el API de la base de datos de correspondencia
 * 
 */
const express = require('express')
let cors = require('cors')
const  dbCorrespondencia = require('../database/dbCorrespondenciaConnection')


class Server {
    constructor () {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            correspondencia    : '/api/correspondencia',
            auth               : '/api/auth',
            users              : '/api/usuarios'
        }

        // conexión a la base de datos MySql
        this.conectarDb()
        // middlewares
        this.middlewares ()
        // rutas
        this.routes()
    }

    // conexión a la bd
    async conectarDb() {
        try {
            await dbCorrespondencia.authenticate()
            console.log ('Base de datos de Correspondencia ONLINE...')
        } catch (err) {
            console.log ('Se ha presentado un error al conectarse a la BD.')
            console.log(err)
        }
    }

    // configuramos middlewares
    middlewares() {
        // cors
        this.app.use( cors() )
        // lectura y parseo del body para amitir json
        this.app.use ( express.json ())
        // para la carpeta pública
        this.app.use ( express.static('public'))
    }

    // definición de rutas
    routes() {
        this.app.use ( this.paths.correspondencia, require('../routes/routesCorrespondencia'))
        this.app.use ( this.paths.auth, require('../routes/routesAuth'))
        this.app.use ( this.paths.users, require('../routes/routesUsuarios'))
    }

    // iniciamos el servidor
    listen () {
        this.app.listen ( this.port,() => {
            console.log (`Servidor de correspondencia corriendo en el puerto ${ this.port }`)
        })
    }
}

module.exports = Server