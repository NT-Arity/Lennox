// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require("@discordjs/builders");
const translate = require('../functions/translatePremiumTiers');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server information."),
    async execute(interaction) {
        const embedSI = new MessageEmbed()
        .setTitle("Server Info")
        .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
        .setColor("#b20003")
        .addFields({
            name: "Server Name:",
            value: `${interaction.guild.name}`,
            inline: false,
        }, {
            name: "Owner:",
            value: `<@!${interaction.guild.ownerId}>`,
            inline: false,
        }, {
            name: "Guild ID:",
            value: `${interaction.guild.id}`,
            inline: false,
        }, {
            name: "Member Count:",
            value: `${interaction.guild.memberCount}`,
            inline: false,
        }, {
            name: "Premium Tier:",
            value: `${translate(interaction.guild.premiumTier)}`,
            inline: false,
        })
        .setImage(`${interaction.guild.bannerURL({ dynamic: true, size: 2048 }) ? interaction.guild.bannerURL({ dynamic: true, size: 2048 }) : "https://cdn.discordapp.com/attachments/837778991066775553/924504316881014834/Untitled520_20211225222850_remastered.png"}`)
        .setFooter(`Slash command executed by ${interaction.user.tag}`)
        .setTimestamp();

        await interaction.guild.stickers.fetch().then(sticker => {
            embedSI.addField("Sticker Count:", `${sticker.size}`, false);
        });

        await interaction.guild.emojis.fetch().then(emoji => {
            embedSI.addField("Emoji Count:", `${emoji.size}`, false);
        });

        await interaction.guild.roles.fetch().then(role => {
            embedSI.addField("Role Count:", `${role.size}`, false);
        })

        await embedSI.addField("Banner:", "\u200b", false);

        await interaction.reply({ embeds: [embedSI] });
    }
}