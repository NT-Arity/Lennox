// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Sends a message containing the slash commands, and what they do.")
        .addStringOption(option => option.setName("command").setDescription("See additional information on a command")),
    async execute(interaction) {
        const command = interaction.options.getString("command");
        const data = [];
        const commandMap = interaction.client.commands
        const commandNames = [];
        const commands = interaction.client.commands.get(command);

        for (const [key, value] of commandMap) {
            commandNames.push(`/${key}`);
        }

        if (!command) {
            data.push("Here is all of my commands:");
            data.push(`\`\`\`\n${commandNames.join("\n")}\n\`\`\``);
            data.push("You can type \`/help\`, and use the optional \`command\` input to get more information on the command.");

            return interaction.reply({ content: data.join("\n") });
        } else {
            data.push(`**Name:** ${commands.data.name}`);
            data.push(`**Description:** ${commands.data.description}`);

            return interaction.reply({ content: data.join("\n") });
        }
    }
}