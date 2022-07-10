const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'spoiler',
            description: 'utilize este comando para fazer um spoiler',
            options: [
                {
                    type: 'ATTACHMENT',
                    name: 'arquivo',
                    description: 'caso deseje fixar um arquivo, anexe-a normalmente'
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Você não tem permissão para utilizar este comando!', ephemeral: true })

        const filter = m => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
        const canal = interaction.guild.channels.cache.find(channel => channel.id === '993947241133920408')
        const attachment = interaction.options.getAttachment('arquivo')

        interaction.reply('Digite a mensagem abaixo que você deseja para ser enviada')
        setTimeout(() => { interaction.deleteReply() }, 10000);

        if (attachment) {
            collector.on('collect', m => {

                let embed = new MessageEmbed()
                    .setTitle('Spoiler Shiwu')
                    .setDescription(m.content)
                    .setColor('BLUE')
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))

                canal.send({ embeds: [embed] })
                canal.send({ files: [attachment.setSpoiler()] })
                canal.send('@everyone').then(msg => setTimeout(() => msg.delete(), 500))
                m.delete()
            })
        } else {
            collector.on('collect', m => {

                let embed = new MessageEmbed()
                    .setTitle('Spoiler Shiwu')
                    .setDescription(m.content)
                    .setColor('BLUE')
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))

                canal.send({ embeds: [embed] })
                canal.send('@everyone').then(msg => setTimeout(() => msg.delete(), 500))
                m.delete()
            })
        }


    }
}