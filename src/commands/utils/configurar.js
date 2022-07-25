const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { offguilds } = require('../../database/models/Models')


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configurar',
            description: 'menu de configurações',
            cooldown: 3
        })
    }
    run = async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ content: 'Você não tem permissão para utilizar este comando!' })
        if (!message.guild.me.permissions.has('MANAGE_GUILD')) return message.reply({ content: 'Eu não tenho permissão para executar esta ação!' })

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

                const button4 = new MessageButton()
                    .setCustomId(message.author.id + ' counter-members')
                    .setLabel('contador')
                    .setStyle('PRIMARY')

                let row = new MessageActionRow()
                    .addComponents(button, button2, button3, button4)

                let embed = new MessageEmbed()
                    .setTitle('Lucii Menu')
                    .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`boas-vindas\` da Lucii! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de boas-vindas \`customizável\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\nO sistema consiste em **você definir** o canal que a mensagem será enviada, o texto entre outras coisas!\n\n> <a:setaaa:796075080542584912> Utilize os botões abaixo para fazer a configuração!\n> <a:setaaa:796075080542584912> Váriaveis do botão contador: \`{membros}\``)
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
                    .setDescription(`\`•\` Olá, seja bem vindo ao menu de \`proteção\` da Lucii! <:winkk:795332180473544714>\n\n <a:concluido:795402598345474108> Ofereço à você o sistema de proteção de \`Anti-Bot\`\n\n\`\`\`Configure do jeito que você deseja!\`\`\`\n\n <:firewall:786084932405297212> O sistema consiste em **você definir** quantos dias as contas devem ter para entrar em seu servidor, evitando por exemplo aquelas pessoa divulgando link no pv de seus membros!\n\n> Utilize os botões abaixo para fazer a configuração!\n> <a:setaaa:796075080542584912> o tempo deverá ser inserido em dias.\n> <a:setaaa:796075080542584912> o botão "Logs" é por wehook, enviando uma mensagem quando alguém tenta entrar e é barrado pelo antibot.`)
                    .setImage('https://i.imgur.com/i7SJjLU.gif')
                    .setColor('RED')

                message.reply({ embeds: [embedProt], components: [rowProt], ephemeral: true })

                break;

            case "canal de erros":
            case "canal erros":

                if (message.author.id !== "979727152364810280") return

                let server = (await offguilds.findById(message.guild.id)) || (await new offguilds({ _id: message.guild.id }))

                const filter = m => m.author.id === message.author.id

                message.channel.send({ content: "Mencione um canal onde será enviado os erros do bot!" }).then(msg => setTimeout(() => msg.delete(), 5000))

                const collector = message.channel.createMessageCollector({ filter, max: 1, time: 5 * 60 * 60 })
                collector.on("collect", l => {

                    let channel = l.mentions.channels.first() || this.client.channels.cache.get(l.content)

                    if (channel.type !== "GUILD_TEXT") return interaction.channel.send("Erro ao definir canal, você precisa mencionar um canal de TEXTO").then(msg => setTimeout(() => msg.delete(), 4000))

                    server.options.errors = channel.id
                    server.markModified('options')
                    server.save()

                    message.reply({ content: "<a:concluido:795402598345474108> Sucesso ao definir o canal.\n`Definido em: `" + channel.toString() })
                })

                collector.on('end', (c, r) => {
                    if (r === 'time') interaction.channel.send({ content: '<:relo:996105619394285588> Tempo `esgotado`.' }).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                })

                break;

            default:
                break;
        }
    }
}