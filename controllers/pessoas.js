const pessoas = require('../models/pessoas')

const index = async (connection, req, res) => {
    const params = {
        pageSize: req.query.pageSize || 10,
        currentPage: req.query.page || 0
    }

    const results = await pessoas.findAll(connection, params)
    res.render('pessoas/index', {
        results
    })
}

const remove = async (connection, req, res) => {
    await pessoas.remove(connection, req.params.id)
    res.redirect('/pessoas')
}

const createForm = (req, res) => {
    res.render('pessoas/create')
}

const createProcess = async (connection, req, res) => {
    let { nome, nascimento, cargo } = req.body

    //formatar data dd/mm/aaaa para aaaa-mm-dd
    let dateSplit = nascimento.split("/");
    nascimento = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]

    await pessoas.create(connection, { nome, nascimento, cargo })
    res.redirect('/pessoas')
}


const updateForm = async (connection, req, res) => {
    const pessoa = await pessoas.findById(connection, req.params.id)

    const dia = ("0" + pessoa.nascimento.getDate()).substr(-2)
    const mes = ("0" + (pessoa.nascimento.getMonth() + 1)).substr(-2)
    const ano = pessoa.nascimento.getFullYear();
    const dateString = dia + '/' + mes + '/' + ano

    pessoa.nascimento = dateString

    res.render('pessoas/update', {
        pessoa
    })
}

const updateProcess = async (connection, req, res) => {
    let { nome, nascimento, cargo } = req.body

    //formatar data dd/mm/aaaa para aaaa-mm-dd
    let dateSplit = nascimento.split("/");
    nascimento = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]

    await pessoas.update(connection, req.params.id, { nome, nascimento, cargo })
    res.redirect('/pessoas')
}

module.exports = {
    index,
    remove,
    createForm,
    createProcess,
    updateForm,
    updateProcess
}