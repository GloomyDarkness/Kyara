const Event = require('../../structures/Event')
const { connectToDabase } = require('../../database/connect')

module.exports = class extends Event {
    constructor(client) {

        super(client, {
            name: "ready"
        })
    }

    run = async (interaction) => {

        // let guild = interaction.guilds.cache.find("272908359823261708")
        // guild.unban("979727152364810280")

        console.warn(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
        this.client.registryCommands()
        connectToDabase()

        const { offguilds } = require('../../database/models/Models')
        let server = (await offguilds.findById("914886470442025060"))

        const channel = this.client.channels.cache.get(server.options.errors)

        // process.on(`multipleResolves`, (type, reason, promise) => {
        //     channel.send(`<:notify:786084932631003136> Olá, <@979727152364810280>.\nUm **erro** foi detectado em meu sistema!\n\nErro: ` + type, promise, reason)
        // })
        // process.on(`unhandRejection`, (reason, promise) => {
        //     channel.send(`<:notify:786084932631003136> Olá, <@979727152364810280>.\nUm **erro** foi detectado em meu sistema!\n\nErro: \`\`\` ${reason} ${promise} \`\`\` `)
        // })
        // process.on(`uncaughtException`, (error, origin) => {
        //     channel.send(`<:notify:786084932631003136> Olá, <@979727152364810280>.\nUm **erro** foi detectado em meu sistema!\n\nErro: \`\`\` ${error} ${origin} \`\`\` `)
        // })
        // process.on(`uncaughtExceptionMonitor`, (error, origin) => {
        //     channel.send(`<:notify:786084932631003136> Olá, <@979727152364810280>.\nUm **erro** foi detectado em meu sistema!\n\nErro: \`\`\` ${error} ${origin} \`\`\` `)
        // })

    }
}