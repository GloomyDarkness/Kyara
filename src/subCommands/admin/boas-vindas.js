module.exports = async (client, interaction) => {

    let server = await (guilds.findById(interaction.guild.id)) || new guilds({ _id: interaction.guild.id })

    let embed = new MessageEmbed()
        .setTitle('Kyara Menu')
        .setDescription(`\`•\` Olá, seja bem vindo ao menu da Kyara! <:winkk:795332180473544714>`)
        .setImage('https://i.imgur.com/FfeUjSb.gif')
        .setColor('RED')

    interaction.reply({ embeds: [embed] })

}