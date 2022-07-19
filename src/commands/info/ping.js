const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'comando de ping',
            cooldown: 3
        })
    }
    run = (client, message, args) => {

        message.channel.send('🏓 Pong! `' + client.ws.ping + 'ms`').then(msg => {
            setTimeout(() => msg.delete(), 3000)
        })

    }
}