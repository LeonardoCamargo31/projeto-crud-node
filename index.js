const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

//local
const bdLocalhost = {
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: '',
    database: 'cadastro'
}
//producao
const bdProduction = {
    host: 'den1.mysql6.gear.host',
    user: 'projetocrud',
    password: 'Lz9B!9-op8dc',
    database: 'projetocrud'
}


const knex = require('knex')({
    //passamos um obj de configuração ao knex
    client: 'mysql2',
    connection: bdProduction
})

const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/pessoas', pessoas(knex))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.listen(port, () => {
    console.log('Server running in port ' + port)
})