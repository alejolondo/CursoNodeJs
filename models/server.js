const express = require('express')
const cors = require('cors')
const userRoutes = require('../routes/users.routes.js')

class Server {

    constructor(){
        this.app =  express();
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares -> Funciones que siempre va a ejecutarse cuando levante mi servidor
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();


        this.listen();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo de body
        this.app.use(express.json() );
        
        //Directorio publico 
        this.app.use(express.static('public'));


    }

    routes(){
        
        this.app.use(this.usersPath, userRoutes )
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en el puerto', this.port )
        })
    }
}

module.exports  = Server