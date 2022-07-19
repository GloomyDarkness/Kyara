const Command = require('../../structures/slashCommand')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'cabeça',
            description: 'Utilize esse comando para ver a cabeça de algum jogador',
            options: [
                {
                    type: 'STRING',
                    name: 'player',
                    description: 'escreva o nome da cabeça de algum player.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        const nick = interaction.options.getString('player')

        let embed = new MessageEmbed()
        .setTitle(`🍃 Avatar do minecraft de: ${nick}`)
        .setImage(`https://mc-heads.net/head/${nick}`)
        .setColor("#41ffff")
        .setTimestamp()

        interaction.reply({
            embeds: [embed], ephemeral: true
        })
    }

}