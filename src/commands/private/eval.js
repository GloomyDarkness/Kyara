const Command = require('../../structures/Command')
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: '📃 Execute comandos no backend do BOT. (Comando restrito🚫)',
        })
    }

    run = (client, msg, args) => {


        if (msg.author.id !== "979727152364810280") return msg.reply("Sem permissão parcero").then(msg => { setTimeout(() => msg.delete(), 5000) })

        if (msg.content.toLowerCase().includes("token")) {
            msg.reply("🛑 • Tentiva de pegar informações previlegiadas = banimento permanente.")
        }
        else {
            const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g); args.shift()
            const argss = args.join(' ');
            const { inspect } = require("util");
            if (msg.content.split(" ").length !== 1) {
                let result;
                try {
                    result = inspect(eval(argss), { depth: 0 })
                } catch (e) {
                    result = "Ocorreu um erro ao avaliar " + e
                }
                let embed = new MessageEmbed()
                    .setTitle(`🛠 • Eval`)
                    .setColor('RED')
                    .setThumbnail('https://i.giphy.com/media/hDTLvWzCIF3gUc8Fd1/giphy-downsized-large.gif')
                    .setDescription(`📋 • **Resultado:**\`\`\`js\n${result}\n\`\`\` \n<:relo:996105619394285588> • **Tempo de resposta:** \`${Date.now() - msg.createdTimestamp}ms\``)
                    .setFooter({ text: `Executado por: ${msg.author.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=4096` });
                msg.reply({ embeds: [embed] });
            }
        }

    }
}