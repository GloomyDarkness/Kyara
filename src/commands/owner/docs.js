const Command = require('../../structures/Command')
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'docs',
            description: 'info sobre documentação',
            options: [
                {
                    type: 'STRING',
                    name: 'pesquisa',
                    description: 'pesquisa sobre discord',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {

        const search = interaction.options.getString('pesquisa')

        fetch('https://djsdocs.sorta.moe/v2/embed?src=stable&q=' + search)
            .then(res => res.json())
            .then(json => {
                interaction.reply({ embeds: [json] })
            })
            .catch(() => interaction.reply({ content: 'Não achei nenhum resultado para sua pesquisa, tente novamente de uma forma diferente', ephemeral: true }))

    }

}