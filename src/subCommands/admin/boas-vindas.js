const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = async (client, interaction) => {

    const button = new MessageButton()
        .setCustomId('welcome-on')
        .setLabel('ativar')
        .setStyle('SUCCESS')

    const button2 = new MessageButton()
        .setCustomId('welcome-off')
        .setLabel('desativar')
        .setStyle('DANGER')

    let row = new MessageActionRow()
        .addComponents(button, button2)

    let embed = new MessageEmbed()
        .setTitle('Kyara Menu')
        .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`boas-vindas\` da Kyara! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de boas-vindas \`customizável\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\nO sistema consiste em **você definir** o canal que a mensagem será enviada, o texto entre outras coisas!\n\n> <a:setaaa:796075080542584912> Utilize os botões abaixo para fazer a configuração!`)
        .setImage('https://i.imgur.com/FfeUjSb.gif')
        .setColor('RED')

    interaction.reply({ embeds: [embed], components: [row] })

}   