var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

var appRoutes = require('./routes/app')
var usuarioRoutes = require('./routes/usuario')
var loginRoutes = require('./routes/login')

app.use('/usuario', usuarioRoutes)
app.use('/login', loginRoutes)
app.use('/', appRoutes)

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true }, ( err, res) => {
    if (err) throw err

    console.log('Base de datos en línea')
})

app.listen(3000, () => {
    console.log('Express server en puerto 3000 en línea')
})