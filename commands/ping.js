// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with ping information."),
    async execute(interaction) {
        let latency = Date.now() - interaction.createdTimestamp;
        let apiLatency = Math.round(interaction.client.ws.ping);

        await interaction.reply(`Latency: \`${latency}\`\nAPI Latency: \`${apiLatency}\``);
    }
}