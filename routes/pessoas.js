const express = require('express')
const pessoasController = require('../controllers/pessoas')

//minha função defino as rotas, e retorno o router
const pessoasRouter = (connection ) => {
    const router = express.Router()

    //o bind, ele vai criar outra função, baseada nessa pessoasController.index
    //passa contexto null, e fixamos o primeiro parametro connection
    router.get('/', pessoasController.index.bind(null, connection))

    router.get('/delete/:id', pessoasController.remove.bind(null, connection))

    router.get('/create',pessoasController.createForm)
    router.post('/create',pessoasController.createProcess.bind(null, connection))

    router.get('/update/:id',pessoasController.updateForm.bind(null, connection))
    router.post('/update/:id',pessoasController.updateProcess.bind(null, connection))

    return router
}

module.exports = pessoasRouter //exporto minha função
