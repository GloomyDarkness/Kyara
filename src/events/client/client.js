const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }
    run = async (message) => {
        const prefix = process.env.PREFIX

        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = this.client.commands.find(c => c.name === args[0])

        if (cmd.length === 0) return;

        if (cmd)
            cmd.run(this.client, message, args)
    }
}