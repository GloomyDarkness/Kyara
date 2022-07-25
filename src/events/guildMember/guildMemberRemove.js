const Event = require('../../structures/Event')
const { MessageEmbed, WebhookClient } = require('discord.js');
const { guilds } = require('../../database/models/Models')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberRemove'
        })
    }

    run = async (member) => {

        let server = (await guilds.findById(member.guild.id)) || new guilds({ _id: member.guild.id })

        if (server.welcome.channelM.channel) {
            const channelM = this.client.channels.cache.get(server.welcome.channelM.channel)
            const channelMessage = server.welcome.channelM.message.replace("{membros}", member.guild.memberCount)
            channelM.setName(channelMessage)
        }

    }
}