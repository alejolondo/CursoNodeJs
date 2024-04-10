const express = require('express')

class Server {

    constructor(){
        this.app =  express();
        this.port = process.env.PORT

        //Middlewares -> Funciones que siempre va a ejecutarse cuando levante mi servidor
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();


        this.listen();
    }

    middlewares() {
        //Directorio publico 
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.status(200).json({
                msg: 'Hello World, GET'
            })
          })

          this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'Hello World, POST'
            })
          })

          this.app.put('/api', (req, res) => {
            res.status(200).json({
                msg: 'Hello World, PUT'
            })
          })

          this.app.delete('/api', (req, res) => {
            res.status(200).json({
                msg: 'Hello World, DELETE'
            })
          })
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en el puerto', this.port )
        })
    }
}

module.exports  = Server