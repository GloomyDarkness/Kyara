const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome: {
        channel: String,
        role: String
    },
    antibot: {
    activated: Boolean,
    days: Number
}
})

module.exports = model('guilds', guildSchema)