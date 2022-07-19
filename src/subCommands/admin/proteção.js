const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = async (client, interaction) => {

    const button = new MessageButton()
        .setCustomId(interaction.user.id + ' antibot-on')
        .setLabel('Ativar')
        .setStyle('SUCCESS')

    const button2 = new MessageButton()
        .setCustomId(interaction.user.id + ' antibot-off')
        .setLabel('Desativar')
        .setStyle('DANGER')

    const button3 = new MessageButton()
        .setCustomId(interaction.user.id + ' dias')
        .setLabel('Tempo')
        .setStyle('PRIMARY')

    const button4 = new MessageButton()
        .setCustomId(interaction.user.id + ' webhook')
        .setLabel('Logs')
        .setStyle('SECONDARY')

    let row = new MessageActionRow()
        .addComponents(button, button2, button3, button4)

    let embed = new MessageEmbed()
        .setTitle('Lucii Menu')
        .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`proteção\` da Luciiw! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de proteção de \`Anti-Bot\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\n <:AlliancePNG:808738469773049957> O sistema consiste em **você definir** quantos dias as contas devem ter para entrar em seu servidor, evitando por exemplo aquelas pessoa divulgando link no pv de seus membros!\n\n> Utilize os botões abaixo para fazer a configuração!\n> <a:setaaa:796075080542584912> o tempo deverá ser inserido em dias.\n> <a:setaaa:796075080542584912> o botão "Logs" é por wehook, enviando uma mensagem quando alguém tenta entrar e é barrado pelo antibot.`)
        .setImage('https://i.imgur.com/FfeUjSb.gif')
        .setColor('RED')

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

}   