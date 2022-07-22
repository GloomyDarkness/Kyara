const Command = require('../../structures/Command')
const Discord = require('discord.js')


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'adicionar',
            aliases: ['add'],
            description: '.',
            cooldown: 5
        })
    }
    run = async (client, message, args) => {

        let argumentss = args.slice(1).join(' ')

        if (argumentss.startsWith('emoji')) {

            for (const emojis of args) {
                const getEmoji = Discord.Util.parseEmoji(emojis)

                if (getEmoji.id) {
                    const emojiType = getEmoji.animated ? '.gif' : '.png'
                    const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiType}?size=40&quality=lossless`

                    message.guild.emojis
                        .create(emojiURL, getEmoji.name).then((emoji) => {
                            message.channel.send(`<a:concluido:795402598345474108> Sucesso! o emoji ${emoji} foi adicionado com o nome de: \`${emoji.name}\` com sucesso no servidor.`)
                        })
                }
            }

        }

    }
}