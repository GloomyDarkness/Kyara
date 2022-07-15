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


                    if (server?.antibot.activated === true) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-bot já está ativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.antibot.activated = true
                    server.markModified('antibot')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de anti-bot ativado com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    break;

                case 'antibot-off':

                    if (server?.antibot.activated === false) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-bot já está desativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.antibot.activated = false
                    server.markModified('antibot')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de anti-bot desativado com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    break;

                case 'dias':

                    if (server?.antibot.activated === false || !server.antibot.activated) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de anti-bot está `desativado`, ative-o primeiro antes de definir a quantia de dias.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    let filter = m => m.author.id === interaction.user.id

                    interaction.update({})
                    interaction.channel.send('Insira a quantia de dias que a pessoa tem que ter para entrar no servidor\nObs: os números devem ser inteiros, caso contrário o resultado será aproximado.').then(msg => {
                        setTimeout(() => msg.delete(), 15000)
                    })

                    const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 5 * 60 * 1000 })

                    collector.on('collect', l => {

                        let a = parseInt(l.content)

                        if (a === NaN) return interaction.channel.send('Tente novamente inserindo um NÚMERO').then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })

                        l.delete()

                        if (a <= 0) return interaction.channel.send('Tente novamente inserindo um NÚMERO VÁLIDO').then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })

                        let dias = ~~l.content
                        server.antibot.days = dias
                        server.markModified('antibot')
                        server.save()
                        interaction.channel.send('Sucesso! Dias definidos em ' + server.antibot.days + ' dias').then(msg => { setTimeout(() => msg.delete(), 10000) })

                        l.delete()

                    })

                    collector.on('end', (c, r) => {
                        if (r === 'time') interaction.channel.send({ content: '<:relo:996105619394285588> Tempo `esgotado`.' }).then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })
                    })

                    break;

                case 'welcome-on':


                    if (server?.welcome.activated === true) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de boas-vindas já está ativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.welcome.activated = true
                    server.markModified('welcome')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de boas-vindas ativado com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    break;

                case 'welcome-off':

                    if (server?.welcome.activated === false) return interaction.update({}) && interaction.channel.send({ content: '<:erradissimo:800148953613205534> O sistema de boas-vindas já está desativado' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    server.welcome.activated = false
                    server.markModified('welcome')
                    server.save()
                    interaction.update({})
                    interaction.channel.send({ content: '<a:concluido:795402598345474108> sistema de boas-vindas desativado com `sucesso`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                    break;

                case 'webhook':

                    interaction.update({})
                    interaction.channel.send('Mencione um canal de texto').then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })

                    let filterr = m => m.author.id === interaction.user.id
                    const channelCollector = interaction.channel.createMessageCollector({ filterr, max: 1, time: 15000 })

                    channelCollector.on('collect', l => {
                        console.log(l.mentions.channels.first().id)

                    })

                    channelCollector.on('end', (c, r) => {
                        if (r === 'time') interaction.channel.send({ content: '<:relo:996105619394285588> Tempo `esgotado`.' }).then(msg => {
                            setTimeout(() => msg.delete(), 10000)
                        })
                    })

                    break;

            }
        }
    }
}