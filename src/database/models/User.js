const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    _id: String,
    ticket: {
        have: Boolean
    }

})

module.exports = model('users', userSchema)