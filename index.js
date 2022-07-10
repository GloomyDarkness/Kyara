require('dotenv').config()
const Client = require('./src/structures/Client')


const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

var http = require('http'); http.createServer(function (req, res) { res.write("Bot online por ! Darkness#4128"); res.end(); }).listen(8181);

// process.on(`multipleResolves`, (type, reason, promise) => {
//     console.log(`erro detectado\n\n` + type, promise, reason)
// })
// process.on(`unhandRejection`, (reason, promise) => {
//     console.log(`erro detectado\n\n` + reason, promise)
// })
// process.on(`uncaughtException`, (error, origin) => {
//     console.log(`erro detectado\n\n` + error, origin)
// })
// process.on(`uncaughtExceptionMonitor`, (error, origin) => {
//     console.log(`erro detectado\n\n` + error, origin)
// })

client.login(process.env.BOT_TOKEN)