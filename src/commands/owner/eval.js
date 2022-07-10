const Command = require('../../structures/Command')
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: '📃 Execute comandos no backend do BOT. (Comando restrito🚫)',
            options: [
                {
                    type: 'STRING',
                    name: 'código',
                    description: '📃 Execute comandos no backend do BOT. (Comando restrito🚫)',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        if (interaction.user.id != '785476244204421140') return interaction.reply({ content: process.env.PERMISSIONS, ephemeral: true })
        const search = interaction.options.getString('código')
        const { inspect } = require("util");
        if (search.split(" ").length !== 0) {
            let result;
            try {
                let evalConteudo = eval(search)
                result = inspect(evalConteudo, {
                    depth: 0
                })
            } catch (e) {
                result = "Ocorreu um erro ao avaliar " + e
            }
            let embed = new MessageEmbed()
                .setTitle(`🔌 | Eval`)
                .setColor(process.env.COLOR)
                .setDescription(`✅ | **Resultado:**\`\`\`js\n${result}\n\`\`\` `)
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }

}