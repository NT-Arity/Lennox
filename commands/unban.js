const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unbans the member")
        .addStringOption(option => option.setName("target").setDescription("The member that needs to be unbanned."))
        .addStringOption(option => option.setName("reason").setDescription("The reason why the member is being unbanned.")),
    async execute(interaction) {
        const userID = interaction.options.getInteger("target");
        const author = interaction.user.id;
        const unbanReason = interaction.options.getString("reason");
        const member = interaction.guild.members.fetch(author);

        if (!userID) return interaction.reply({ content: "You need a member to unban.", ephemeral: true });
        if (!(await member).permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: "You don't have the permission to unban members\n\nYou need the \`KICK_MEMBERS\` perm", ephemeral: true })
        if (userID.length != 18) return interaction.reply({ content: "That isn't an ID.", ephemeral: true });

        interaction.guild.bans.fetch().then(banned => {
            let list = banned.map(ban => ban.user.id);

            if (!list.includes(userID)) {
                interaction.reply({ content: "That member isn't banned.", ephemeral: true });
            } else {
                interaction.guild.bans.remove(userID, unbanReason).then(user => {
                    interaction.reply(`Successfully unbanned \`${user.tag}\` with the reason: ${unbanReason ? unbanReason : "N/A"}`);
                })
            }
        })
    }
}