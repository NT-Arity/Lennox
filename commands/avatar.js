// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Grabs the user's avatar")
        .addUserOption(option => option.setName("target").setDescription("The user's avatar to show")),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        
        if (user) {
            const embedAU = new MessageEmbed()
            .setAuthor(`${user.username}'s avatar`, `${interaction.guild.iconURL({ dynamic: true })}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor("#630700")
            .setTimestamp();

            interaction.reply({ embeds: [embedAU] });
        } else {
            const embedA = new MessageEmbed()
            .setAuthor(`${interaction.user.username}'s avatar`, `${interaction.guild.iconURL({ dynamic: true })}`)
            .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor("#630700")
            .setTimestamp();

            interaction.reply({ embeds: [embedA] });
        }
    }
}
