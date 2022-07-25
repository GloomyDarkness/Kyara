const Command = require('../../structures/Command')
const diciojs = require('dicionario.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'piada',
            description: 'bot conta uma piada',
            cooldown: 3
        })
    }
    run = (client, message, args) => {

        const piada = diciojs.piada()
        message.channel.send(`**Q:** ${piada.properties.pergunta}\n**R:** ${piada.properties.resposta}`)
    }
}