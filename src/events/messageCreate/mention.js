const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }
    run = (message) => {

        let Array = [
            'Olá 😁, para ver meus comandos utilize [`/`]e clique na minha foto ou utilize o meu prefixo `!`',
            'Vejo que me marcou, para saber meus comandos utilize [`/`] e clique em minha foto 😉'
        ]


        let content = Array[(Math.floor(Math.random() * Array.length))]

        if (message.mentions.members.firstKey() === message.client.user.id) return message.channel.send(content)
    }
}