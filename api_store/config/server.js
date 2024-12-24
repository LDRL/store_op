const express = require("express");
const cors = require('cors');
const {dbConnnectonMySql} = require("./db/connection");
// const db = require("../models/mysql");
//cors permite proteger el servidor
class Server {
    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            marcas: '/api/marcas',
            productos: '/api/productos',
            ordenes: '/api/ordenes',
            clientes: '/api/clientes'

        }

        //Conectar a base de datos
        this.conectarDB

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
    }

    async conectarDB() {
        await dbConnnectonMySql();
    }

    middlewares() {
        //cors
        this.app.use( cors() )

        this.app.use(express.json());  
        this.app.use(express.urlencoded({ extended: true }));
    

        //Direccion publica
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.marcas, require('../routes/marcas'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.ordenes, require('../routes/ordenes'))
        this.app.use(this.paths.clientes, require('../routes/clientes'))
        this.app.use('*',(req,res) => {
            res.status(404).json({
                errors: {
                    msg:'URL_NOT_FOUND'
                }
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Backend Up run http://localhost:${this.port}`);
        });        
    }
}

module.exports = Server