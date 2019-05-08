const express = require('express')
const path = require('path')
const bodyParser=require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const pessoas = require('./routes/pessoas')

const dependencies = {
    connection
}

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/pessoas', pessoas(dependencies))//passo as dependencias, com a conexão

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


connection.connect((err) => {
    if (err) {
        console.log('erro ao conectar com mysql', err)
    } else {
        //conectado ao mysql
        app.listen(port, () => {
            console.log('Server running in port ' + port)
        })
    }
})