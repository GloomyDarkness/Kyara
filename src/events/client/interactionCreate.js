const Event = require('../../structures/Event')
const delay = ms => new Promise(res => setTimeout(res, ms));
const { guilds } = require("../../database/models/Models")

module.exports = class extends Event {
    constructor(client) {

        super(client, {
            name: "interactionCreate"
        })
    }

    run = async (interaction) => {

        let server = await (guilds.findById(interaction.guild.id)) || new guilds({ _id: interaction.guild.id })

        if (interaction.isCommand()) {
            if (!interaction.guild) return
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) {
                cmd.run(interaction)
            }
        } else if (interaction.isButton()) {
            switch (interaction.customId) {

                case 'antibot-on':


                    if (server?.antibot.activated === true) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-botjá está ativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.antibot.activated = true
                    server.markModified('antibot')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de anti-botativo com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    break;

                case 'antibot-off':

                    if (server?.antibot.activated === false) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-botjá está desativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.antibot.activated = false
                    server.markModified('antibot')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de anti-botdesativado com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    break;

                case 'dias':

                    if (server?.antibot.activated === false || !server.antibot.activated) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-botestá `desativado`, ative-o primeiro antes de definir a quantia de dias.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    const filter = m => m.author.id === interaction.user.id

                    interaction.update({})
                    interaction.channel.send('Insira a quantia de dias que a pessoa tem que ter para entrar no servidor').then(msg => {
                        setTimeout(() => msg.delete(), 15000)
                    })

                    const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 })

                    collector.on('collect', l => {
                        console.log(l.content)

                        if (!l.content.isNaN) console.log('n é numero')

                        l.delete()

                    })
                    collector.on('end', (c, r) => {
                        if (r === 'time') interaction.channel.send({ content: 'Tempo esgotado.' }).then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })
                    })

                    break;
            }
        }
    }
}