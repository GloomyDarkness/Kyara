const Event = require('../../structures/Event')
const { MessageEmbed } = require('discord.js');
const { guilds } = require('../../database/models/Models')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) => {

        let server = (await guilds.findById(member.guild.id)) || new guilds({_id: interaction.guild.id})

        if (server.antibot.activated = true) {
            const time = ~~((Date.now() - member.user.createdTimestamp) / (1000 * 3600 * 24))
            let days = server.antibot.days

            if (time < days) {
                member.kick()
                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(member.client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Anti-Bot 🔒')
                    .setDescription(`Olá 👋 Sou o sistema de Anti-Bot do RedeShiwu!\n> Você deve estar se perguntando \`por que não consegui entrar?\`\n\nVou explicar para você, nós da equipe do RedeShiwu prezamos muito pela proteção do nosso servidor, e a sua conta é muito nova no discord! você precisa de pelo menos \`${server.antibot.days}\` dias de conta, e você tem apenas \`${time}\` dias \n\nCaso aconteça algum engano mande pedido de amizade para:
                    \`! Darkness#4128\``)

                    return member?.send({ embeds: [embed] }).catch(() => console.log("DM bloqueada"))

            }
        }

        if (server.welcome.role) {
            const role = server.welcome.role
            member.roles.add(role)
        }

        if (server.welcome.channel) {
            const canal = this.client.channels.cache.get(server.welcome.channel)

            const embed = new MessageEmbed()
                .setTitle(`BEM-VINDO(A)!`)
                .setDescription(`
                        👲🏼 ${member} **Bem-vindo(a) ao __RedeShiwu!__**\n
                        __ **Importante!**__\n
                        **Leia as regras para evitar penalidades!**\n
                        ✅ __**Precisa de ajuda ?!**__\n
                        **Se você tiver alguma dúvida ou problema, por favor, abra um ticket!**\n
                        <:Green:938584114787917854> **Tag do usuário: ${member.user.username}#${member.user.discriminator}**`
                )
                .setColor('BLUE')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

            canal.send({ embeds: [embed] })
        }

    }
}