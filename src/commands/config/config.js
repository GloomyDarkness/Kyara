const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configurar',
            description: 'Configurar dados do servidor no bot.',
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'menu',
                    description: '.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'proteção',
                            description: '🔧 configuração do sistema de anti bot',
                        },
                        {
                            type: 'SUB_COMMAND',
                            name: 'boas-vindas',
                            description: '🔧 configuração do sistema de boas vindas.'
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Você não tem permissão para utilizar este comando!', ephemeral: true })

        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/admin/${subCommand}`)(this.client, interaction)
    }
}