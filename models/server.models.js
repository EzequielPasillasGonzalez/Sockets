const express = require('express')
var cors = require('cors');
const { socketController } = require('../sockets_controllers/sockets_controllers');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Configuracion para los sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
        }

        //Todo: Middleswares
        this.middlewares()


        //Todo: Rutas de la aplicacion
        this.routes()

        // Eventos de Sockets
        this.sockets()
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Directorio publico
        this.app.use(express.static('public'))

    }

    routes() {

        // this.app.use(this.paths.auth, require('../routes/auth.routes'))
        // this.app.use(this.paths.buscar, require('../routes/search.routes'))
        // this.app.use(this.paths.category, require('../routes/category.routes'))
        // this.app.use(this.paths.products, require('../routes/products.routes'))
        // this.app.use(this.paths.role, require('../routes/role.routes'))
        // this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
        // this.app.use(this.paths.user, require('../routes/user.routes'))
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server