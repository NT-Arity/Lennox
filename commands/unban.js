const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unbans the member")
        .addStringOption(option => option.setName("target").setDescription("The member that needs to be unbanned."))
        .addStringOption(option => option.setName("reason").setDescription("The reason why the member is being unbanned.")),
    async execute(interaction) {
        const userID = interaction.options.getString("target");
        const author = interaction.user.id;
        const unbanReason = interaction.options.getString("reason");
        const member = interaction.guild.members.fetch(author);

        if (!userID) return interaction.reply({ content: "You need a member to unban.", ephemeral: true });
        if (!(await member).permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: "You don't have the permission to unban members\n\nYou need the \`KICK_MEMBERS\` perm", ephemeral: true })

        interaction.guild.members.unban(`${userID}`)
            .then(user => console.log(user.id))
            .catch(console.error);
    }
}