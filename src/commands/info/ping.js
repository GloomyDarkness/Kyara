const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Mostra o ping do bot."
        })
    }

    run = (ctx) => {
        ctx.sendMessage({
            content: `Pong! \`${this.client.ws.ping}\`ms`,
            ephemeral: true
        })
    }
}

