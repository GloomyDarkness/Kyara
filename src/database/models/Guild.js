const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome: {
        activated: Boolean,
        channel: String,
        role: String
    },
    antibot: {
        activated: Boolean,
        days: Number,
        url: String
    }
})

module.exports = model('guilds', guildSchema)