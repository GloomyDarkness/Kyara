const { Schema, model } = require('mongoose')

const officialGuildSchema = new Schema({
    _id: String,
    options: {
        errors: String
    }
})

module.exports = model('offguilds', officialGuildSchema)