
const { guilds } = require('../../database/models/Models')

module.exports = async (client, interaction) => {

    const days = interaction.options.getInteger('dias')
    let server = (await guilds.findById(interaction.guild.id)) || (await new guilds({ _id: interaction.guild.id }).save())

    server.antibot.activated = true
    server.antibot.days = days

    server.save()

    interaction.reply({
        content: `Dias setado com sucesso!\n> ✅ ${days} dias definido`,
        ephemeral: true
    })

}