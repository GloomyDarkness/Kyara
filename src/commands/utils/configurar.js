const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configurar',
            description: 'menu de configurações',
            cooldown: 3
        })
    }
    run = (client, message, args) => {

        let argumentss = args.slice(1).join(' ')

        switch (argumentss.toLowerCase()) {
            case "boas vindas":

                const button = new MessageButton()
                    .setCustomId(message.author.id + ' welcome-on')
                    .setLabel('ativar')
                    .setStyle('SUCCESS')

                const button2 = new MessageButton()
                    .setCustomId(message.author.id + ' welcome-off')
                    .setLabel('desativar')
                    .setStyle('DANGER')

                const button3 = new MessageButton()
                    .setCustomId(message.author.id + ' welcome-channel')
                    .setLabel('canal')
                    .setStyle('PRIMARY')

                let row = new MessageActionRow()
                    .addComponents(button, button2, button3)

                let embed = new MessageEmbed()
                    .setTitle('Lucii Menu')
                    .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`boas-vindas\` da Lucii! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de boas-vindas \`customizável\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\nO sistema consiste em **você definir** o canal que a mensagem será enviada, o texto entre outras coisas!\n\n> <a:setaaa:796075080542584912> Utilize os botões abaixo para fazer a configuração!`)
                    .setImage('https://i.imgur.com/i7SJjLU.gif')
                    .setColor('RED')

                message.reply({ embeds: [embed], components: [row] })

                break;

            case "proteção":

                const buttonProt = new MessageButton()
                    .setCustomId(message.author.id + ' antibot-on')
                    .setLabel('Ativar')
                    .setStyle('SUCCESS')

                const button2Prot = new MessageButton()
                    .setCustomId(message.author.id + ' antibot-off')
                    .setLabel('Desativar')
                    .setStyle('DANGER')

                const button3Prot = new MessageButton()
                    .setCustomId(message.author.id + ' dias')
                    .setLabel('Tempo')
                    .setStyle('PRIMARY')

                const button4Prot = new MessageButton()
                    .setCustomId(message.author.id + ' webhook')
                    .setLabel('Logs')
                    .setStyle('SECONDARY')

                let rowProt = new MessageActionRow()
                    .addComponents(buttonProt, button2Prot, button3Prot, button4Prot)

                let embedProt = new MessageEmbed()
                    .setTitle('Lucii Menu')
                    .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`proteção\` da Lucii! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de proteção de \`Anti-Bot\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\n <:AlliancePNG:808738469773049957> O sistema consiste em **você definir** quantos dias as contas devem ter para entrar em seu servidor, evitando por exemplo aquelas pessoa divulgando link no pv de seus membros!\n\n> Utilize os botões abaixo para fazer a configuração!\n> <a:setaaa:796075080542584912> o tempo deverá ser inserido em dias.\n> <a:setaaa:796075080542584912> o botão "Logs" é por wehook, enviando uma mensagem quando alguém tenta entrar e é barrado pelo antibot.`)
                    .setImage('https://i.imgur.com/i7SJjLU.gif')
                    .setColor('RED')

                message.reply({ embeds: [embedProt], components: [rowProt], ephemeral: true })

                break;

            default:
                break;
        }
    }
}