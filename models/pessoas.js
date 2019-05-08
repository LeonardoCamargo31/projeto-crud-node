const findAll = async (connection) => {
    return await connection('pessoa').select('*')
}

const findById = async (connection, id) => {
    const pessoa = await connection('pessoa').select('*').where('id', id)
    return pessoa.length > 0 ? pessoa[0] : {}
}


const remove = async (connection, id) => {
    return await connection('pessoa').where('id', id).del()
}

const create = async (connection, data) => {
    return await connection('pessoa').insert({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo
    })
}


const update = async (connection, id, data) => {
    return await connection('pessoa')
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