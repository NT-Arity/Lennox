// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server information."),
    async execute(interaction) {
        await interaction.reply(`Server name: \`${interaction.guild.name}\`\nTotal members: \`${interaction.guild.memberCount}\``);
    }
}