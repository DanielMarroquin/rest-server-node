const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Conexion a base de datos
        this.mongoDB();

        // Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async mongoDB () {

        await dbConnection();
    } 

    middlewares () {
        //CORS
        this.app.use( cors() );

        // LEctura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use(express.static('public') );
    }

    routes () {
        this.app.use( this.usersPath, require('../routes/users.route') );
    }

    listen () {
        this.app.listen( this.port, () => {
            console.log('Example app listening on port', this.port )
        });
    }
}

module.exports = Server;