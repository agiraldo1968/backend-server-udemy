var express = require('express')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var SEED = require('../config/config').SEED

var app = express()

var Usuario = require('../models/usuario')

app.post('/', (req, res) => {

    var body = req.body

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscando usuario',
                errors: err
            })
        }

        if (!usuarioBD)
        {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no válidas - email',
                errors: err
            })
        }
        
        if ( !bcrypt.compareSync( body.password, usuarioBD.password))
        {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no válidas - password',
                errors: err
            })
        }

        // Crear token
        usuarioBD.password = ':)'
        var token = jwt.sign( { usuario: usuarioBD }, SEED, { expiresIn: 14400 }) // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token,
            id: usuarioBD._id
        })
    })
})



module.exports = app