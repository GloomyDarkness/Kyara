const discord = require('discord.js')
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delaye = 500

module.exports = async (client, interaction) => {

    const role = interaction.options.getRole('role')

    if (interaction.member.roles.highest.position <= role.position) return interaction.reply({ content: 'O cargo que você está tentando inserir é maior que o seu.', ephemeral: true })

    if (interaction.guild.me.roles.highest.position <= role.position) return interaction.reply({ content: 'Não consigo adicionar cargos maiores que o meu', ephemeral: true })

    const membersArray = interaction.guild.members.cache.filter((member) => !member.roles.cache.has(role.id))
    if (membersArray.size === 0) return interaction.reply({ content: 'Este comando não será executado porque não tem nenhum cargo para ser removido.', ephemeral: true })

    interaction.reply({ content: 'Adicionando o cargo a ' + membersArray.size + ' pessoas, aguarde pois pode demorar um pouco.', ephemeral: true })

    await addRole();

    interaction.editReply(`✅ Sucesso! os cargos foram adicionado à ${membersArray.size} pessoas!`)


    async function addRole() {
        for (const member of membersArray) {
            await delay(delaye);
            await member[1].roles.add(role.id);
        }
    }
}