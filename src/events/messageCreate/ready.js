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

        process.on(`multipleResolves`, (type, reason, promise) => {
            console.log(`erro detectado\n\n` + type, promise, reason)
        })
        process.on(`unhandRejection`, (reason, promise) => {
            console.log(`erro detectado\n\n` + reason, promise)
        })
        process.on(`uncaughtException`, (error, origin) => {
            console.log(`erro detectado\n\n` + error, origin)
        })
        process.on(`uncaughtExceptionMonitor`, (error, origin) => {
            console.log(`erro detectado\n\n` + error, origin)
        })

    }
}