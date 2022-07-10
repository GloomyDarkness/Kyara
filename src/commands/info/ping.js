const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Mostra o ping do bot."
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `Pong! \`${this.client.ws.ping}\`ms`,
            ephemeral: true
        })
    }
}

