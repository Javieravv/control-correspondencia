/**Aplicación principal.
 * Objetivo: hacer un CRUD para el manejo de datos de una tabla de 
 * correspondencia
 */

const Server = require('./models/server')
require ('dotenv').config()

const server = new Server()

// iniciamos servidor
server.listen()

