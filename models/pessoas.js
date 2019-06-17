const findAll = async (connection, params) => {
    const currentPage = params.currentPage 
    const pageSize = params.pageSize
    const totalRecords = await connection('pessoas').count('id as total')

    const totalPages = parseInt(totalRecords[0].total / pageSize)

    const results = await connection('pessoas')
        .select('*')
        .offset(currentPage * pageSize)
        .limit(pageSize)

    return {
        data: results,
        pagination: {
            pages: totalPages,
            pageSize,
            currentPage
        }
    }
}

const findById = async (connection, id) => {
    const pessoa = await connection('pessoas').select('*').where('id', id)
    return pessoa.length > 0 ? pessoa[0] : {}
}


const remove = async (connection, id) => {
    return await connection('pessoas').where('id', id).del()
}

const create = async (connection, data) => {
    return await connection('pessoas').insert({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo
    })
}


const update = async (connection, id, data) => {
    return await connection('pessoas')
        .update({
            nome: data.nome,
            nascimento: data.nascimento,
            cargo: data.cargo
        })
        .where('id', id)
}

module.exports = {
    findAll,
    findById,
    remove,
    create,
    update
}