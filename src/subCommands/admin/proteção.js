const { MessageEmbed } = require('discord.js')
const { guilds } = require("../../database/models/Models")

module.exports = async (client, interaction) => {

    let server = await (guilds.findById(interaction.guild.id)) || new guilds({ _id: interaction.guild.id })

    let embed = new MessageEmbed()
        .setTitle('Kyara Menu')
        .setDescription(`\`•\` Olá, seja bem vindo ao menu de proteção da Kyara! <:winkk:795332180473544714>\nOfereço à você sistemas de proteção`)
        .setImage('https://i.imgur.com/FfeUjSb.gif')
        .setColor('RED')

    interaction.reply({ embeds: [embed] })

}