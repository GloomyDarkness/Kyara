const Event = require('../../structures/Event')
const { users } = require('../../database/models/Models')

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

        let user = (await users.findById(message.author.id)) || (await new users({ _id: message.author.id }).save())

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = this.client.commands.find(c => c.name === args[0])

        if (!cmd) return

        const db = user.commands.find(i => i.name === cmd.name)

        if (cmd.cooldown) {
            if (db) {
                let time = ~~((Date.now() - db.cooldown) / 1000)
                let rest = ''

                if (cmd.cooldown - time > 3600) {
                    rest = ~~((cmd.cooldown - time) / 3600) + 'hora(s) ' + ~~(((cmd.cooldown - time) % 3600) / 60) + ' minuto(s) e ' + ~~(((cmd.cooldown - time) % 3600) % 60) + ' segundo(s)'
                } else if (cmd.cooldown - time > 60) {
                    rest = ~~((cmd.cooldown - time) / 60) + ' minuto(s) e ' + ~~(((cmd.cooldown - time) % 3600) % 60) + ' segundo(s)'
                } else {
                    rest = ~~(cmd.cooldown - time) + ' segundo(s)'
                }

                switch (cmd.cooldown > time) {
                    case true:
                        message.channel.send(`Olá, você tem que esperar \`${rest}\` para usar o comando novamente`).then(msg => setTimeout(msg.delete(), 5000))
                        return
                    case false:
                        user.commands.find(i => i.name === cmd.name).cooldown = Date.now()
                        user.markModified('commands')
                        user.save()
                        break;
                }
            } else {
                user.commands.push({ name: cmd.name, cooldown: Date.now() })
                user.save()
            }

        }

        if (cmd.length === 0) return;

        if (cmd)
            cmd.run(this.client, message, args)
    }
}