const Command = require('../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'aaaaaa',
        })
    }

    run = async (interaction) => {

        let botão = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('verificar-se')
                .setEmoji('🔐')
                .setLabel('Verificar-se')
                .setStyle('PRIMARY')
        )

        let embed = new MessageEmbed()
            .setTitle('Rede Shiwu')
            .setDescription("Olá, boas-vindas ao nosso servidor! Utilizamos deste sistema para evitarmos ataques de contas falsas em nosso servidor, clique no botão abaixo para verificar-se, caso não funcione contate alguém.\n\n IP: redeshiwu.com\nLoja: https://loja.redeshiwu.com/")
            .setColor('BLUE')
            .setImage('https://i.imgur.com/0b2oBjf.gif')
            .setThumbnail(interaction.client.user.displayAvatarURL({
                dynamic: true
            }))

        interaction.channel.send({ embeds: [embed], components: [botão] })
    }
}