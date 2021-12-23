const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("math")
        .setDescription("Performs calculator functions.")
        .addIntegerOption(option => option.setName("num1").setDescription("First number of the expression."))
        .addStringOption(option => option.setName("operator").setDescription("Operation to be performed in the expression."))
        .addIntegerOption(option => option.setName("num2").setDescription("Second number of the expression.")),
    async execute(interaction) {
        const num1 = interaction.options.getInteger("num1");
        const operator = interaction.options.getString("operator").toLowerCase();
        const num2 = interaction.options.getInteger("num2");
        var result;

        if (operator == "+" || operator == "plus" ||operator == "added to" ) {
            result = num1 + num2;
        } else if (operator == "-" || operator == "minus") {
            result = num1 - num2;
        } else if (operator == "*" || operator == "x" || operator == "X" || operator == "times" || operator == "multiply" || operator == "multiplied by") {
            result = num1 * num2;
        } else if (operator == "/" || operator == "divide" || operator == "divided by") {
            result = num1 / num2;
        }

        await interaction.reply(num1 + " " + operator + " " + num2 + " is equal to " + result + ".");
    }
}