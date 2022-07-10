const { connect } = require('mongoose')
const Models = require('../database/models/Models')

function connectToDabase() {
    const connection = connect(process.env.MONGO_URL)

    console.warn('Database conectada com sucesso!')

    this.db = { connection, ...Models }
}

module.exports = { connectToDabase }