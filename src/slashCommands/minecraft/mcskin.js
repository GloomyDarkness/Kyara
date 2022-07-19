const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/slashCommand')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'pegar a cabeça de alguém no minecraft',
            options: [
                {
                    type: 'STRING',
                    name: 'nickname',
                    description: 'informe o nick da pessoa',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {


        const nick = interaction.options.getString('nickname')

        let embed = new MessageEmbed()
            .setTitle(`🍃 Avatar do minecraft de: ${nick}`)
            .setImage(`https://mc-heads.net/body/${nick}`)
            .setColor("#41ffff")
            .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: true })

    }

}