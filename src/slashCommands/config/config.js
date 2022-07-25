const Command = require('../../structures/slashCommand')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configurar',
            description: 'Menu de configuração geral.',
            cooldown: 15,
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
                },
                {
                    type: 'SUB_COMMAND',
                    name: 'remocao',
                    description: 'remover um cargo específico dos membros do servidor.',
                    options: [
                        {
                            type: 'ROLE',
                            name: 'cargo',
                            description: 'informe o cargo específico que quer remover.',
                            required: true
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND',
                    name: 'adicao',
                    description: 'adicione um cargo específico dos membros do servidor.',
                    options: [
                        {
                            type: 'ROLE',
                            name: 'role',
                            description: 'informe o cargo específico que quer adicionar.',
                            required: true
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