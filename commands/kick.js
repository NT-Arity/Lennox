const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks the member")
        .addUserOption(option => option.setName("target").setDescription("The member that needs to be kicked."))
        .addStringOption(option => option.setName("reason").setDescription("The reason why the member is being kicked.")),
    async execute(interaction) {
        const user = interaction.options.getUser("target");
        const author = interaction.user.id;
        const kickReason = interaction.options.getString("reason");
        const member = interaction.guild.members.fetch(author);

        if (!user) return interaction.reply({ content: "You need a member to kick.", ephemeral: true });
        if (!(await member).permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: "You don't have the permission to kick members\n\nYou need the \`KICK_MEMBERS\` perm", ephemeral: true })

        await interaction.guild.members.kick(user, kickReason).then(() => {
            interaction.reply(`Successfully kicked \`${user.tag}\` with the reason: \`${kickReason ? kickReason : "N/A"}\``);
        }).catch(console.error);
    }
}