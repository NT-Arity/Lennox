const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("russian-roulette")
        .setDescription("Starts a game of russian roulette."),
    async execute(interaction) {
        
    }
}