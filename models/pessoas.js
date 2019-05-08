const findAll = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM pessoa', (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const findById = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM pessoa WHERE id = ${id} limit 1`, (err, results) => {
            if (err) {
                reject(err)
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                }
                else {
                    resolve({})
                }
            }
        })
    })
}


const remove = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM pessoa WHERE id = ${id} limit 1`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO pessoa (nome, nascimento, cargo) VALUES ('${data.nome}', '${data.nascimento}', '${data.cargo}')`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}


const update = (connection, id, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE pessoa SET nome = '${data.nome}', nascimento = '${data.nascimento}', cargo = '${data.cargo}' WHERE id = ${id}`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    remove,
    create,
    update
}