const { guilds } = require('../../database/models/Models')

module.exports = async (client, interaction) => {

    const server = await (guilds.findById(interaction.guild.id)) || await new guilds({ _id: interaction.guild.id })
    const role = interaction.options.getRole('cargo')

    server.welcome.role = role.id
    server.markModified('welcome')
    server.save()

    interaction.reply({ content: '✅ canal definido com sucesso!', ephemeral: true })

}