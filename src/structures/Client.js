const { Client } = require('discord.js')
const { join } = require('path')
require('dotenv').config()
const { readdirSync } = require('fs')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.slashCommands = []
        this.loadSlashCommands()
        this.loadCommands()
        this.loadEvents()
    }

    registryCommands() {
        // temporária
        this.guilds.cache.get('914886470442025060').commands.set(this.slashCommands)
        //this.application.commands.set(this.commands)
    }

    loadSlashCommands(path = 'src/slashCommands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const SlashCommandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (SlashCommandClass)(this)

                this.slashCommands.push(cmd)
            }
        }
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
}