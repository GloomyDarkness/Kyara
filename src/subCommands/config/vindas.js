const discord = require('discord.js')
const { guilds } = require('../../database/models/Models')

module.exports = async (client, interaction) => {

    let server = (await guilds.findById(interaction.guild.id)) || (await new guilds({ _id: interaction.guild.id }).save())
    const canal = interaction.options.getChannel('canal')

    if (canal.type !== 'GUILD_TEXT') return interaction.reply({
        content: 'Informe um canal de texto!',
        ephemeral: true
    })

    server.welcome.channel = canal.id
    server.markModified('welcome')
    server.save()

    interaction.reply({
        content: "✅ Canal de entrada definido com sucesso",
        ephemeral: true
    })

}