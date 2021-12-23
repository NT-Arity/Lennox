const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Plays a game of Rock, Paper, Scissors")
        .addStringOption(option => option.setName('choice').setDescription("A required field")),
    async execute(interaction) {
        if (interaction.options.getString("choice") === null) return interaction.reply({ content: `${inlineCode("option")} is required`, epheremal: true });
        
        const option = interaction.options.getString("choice").toLowerCase();
        const botChoice = ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];

        if (option === "rock") {
            switch(botChoice) {
                case "Rock":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nIt's a draw!`);
                    break;
                case "Paper":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nI win!`);
                    break;
                case "Scissors":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nYou win!`);
                    break;
            }
        } else if (option === "paper") {
            switch(botChoice) {
                case "Rock":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nYou win!`);
                    break;
                case "Paper":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nIt's a draw!`);
                    break;
                case "Scissors":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nI win!`);
                    break;
            }
        } else if (option === "scissors") {
            switch(botChoice) {
                case "Rock":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nI win!`);
                    break;
                case "Paper":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nYou win!`);
                    break;
                case "Scissors":
                    await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nIt's a draw!`);
                    break;
            }
        } else {
            await interaction.reply(`**You chose:** ${option}\n**I chose:** ${botChoice}\nI win!`);
        }
    }
}