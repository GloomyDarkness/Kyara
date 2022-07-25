const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js")
const ticketCategories = require("../../util/ticketCategories")

module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({
        content: 'Informe um canal de texto!',
        ephemeral: true
    })

    const embed = new MessageEmbed()
        .setTitle("📋 Lucii Ticket")
        .setImage('https://i.imgur.com/TZHjxXy.gif')
        .setDescription('👋 Olá, eu sou o bot **Luci**!\n\n> Bem vindo a área de ticket!\n\nVocê está precisando de ajuda? Caso esteja escolha uma categoria abaixo de acordo com o que precise e irei criar um canal privado com você e os membros da nossa equipe para ajudar-lo.\n\n`Uso de má fé destes canais será resultado em punição`')
        .setColor('BLUE')

    const menus = ticketCategories.map(c => c.menu)
    const row = new MessageActionRow().addComponents(new MessageSelectMenu().setPlaceholder('Escolha o tipo de atendimento.').setCustomId('openTicket').addOptions([menus]))

    channel.send({
        embeds: [embed],
        components: [row]
    })

    interaction.reply({
        content: 'Canal setado com sucesso!',
        ephemeral: true
    })
}