class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.cooldown = options.cooldown
    }
}

module.exports = Command