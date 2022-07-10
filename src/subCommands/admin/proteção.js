const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = async (client, interaction) => {

    const button = new MessageButton()
        .setCustomId('antibot-on')
        .setLabel('ativar')
        .setStyle('SUCCESS')

    const button2 = new MessageButton()
        .setCustomId('antibot-off')
        .setLabel('desativar')
        .setStyle('DANGER')

    const button3 = new MessageButton()
        .setCustomId('dias')
        .setLabel('tempo')
        .setStyle('PRIMARY')

    let row = new MessageActionRow()
        .addComponents(button, button2, button3)

    let embed = new MessageEmbed()
        .setTitle('Kyara Menu')
        .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`proteção da Kyara!\` <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de proteção de \`Anti-Bot\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\nO sistema consiste em **você definir** quantos dias as contas devem ter para entrar em seu servidor, evitando por exemplo aquelas pessoa divulgando link no pv de seus membros!\n\n> Utilize os botões abaixo para fazer a configuração!\n> <a:alerta:798597669462474793> o tempo tende em ser em dias! ex: 1, 2...`)
        .setImage('https://i.imgur.com/FfeUjSb.gif')
        .setColor('RED')

    interaction.reply({ embeds: [embed], components: [row] })

}   