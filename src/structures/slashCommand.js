class slashCommand {
  constructor(client, options) {
      this.client = client
      this.name = options.name
      this.description = options.description
      this.options = options.options
      this.cooldown = options.cooldown
  }
}

module.exports = slashCommand 