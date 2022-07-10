const Event = require('../../structures/Event')
const { connectToDabase } = require('../../database/connect')

module.exports = class extends Event {
    constructor(client) {

        super(client, {
            name: "ready"
        })
    }

    run = async (interaction) => {

        console.warn(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
        this.client.registryCommands()
        connectToDabase()
    }
}