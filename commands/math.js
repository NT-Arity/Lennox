const { SlashCommandBuilder } = require('@discordjs/builders');
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("math")
        .setDescription("Performs calculator functions.")
        .addStringOption(option => option.setName("expression").setDescription("Expression to be performed.")),
    async execute(interaction) {
        const expression = interaction.options.getString("expression").toLowerCase();
        try {
            await interaction.reply(expression + " equals " + math.evaluate(expression));
        } catch (err) {
            await interaction.reply("An error occured during the evaluation of the input expression.");
            console.log(err);
        }
    }
}