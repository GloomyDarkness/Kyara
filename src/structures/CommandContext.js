const { Message } = require("discord.js")

module.exports = class CommandContext {
  constructor(client, interactionOrMsg) {
    this.client = client;
    if (interactionOrMsg instanceof Message) {
      this.message = interactionOrMsg;
    } else {
      this.interaction = interactionOrMsg;
    }
  }

  sendMessage(content) {
    if (this.message) {
      return this.message.channel.send(content)
    } else {
      return this.interaction.reply(content)
    }
  }
} 