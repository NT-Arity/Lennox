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