// Please read the README.md file located in the command folder to understand how to make commands.

const { SlashCommandBuilder } = require("@discordjs/builders");
const dateToMTH = require("../functions/evaluateDate");
const houseCheck = require("../functions/houseOfWhat");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user information.")
        .addUserOption(option => option.setName("target").setDescription("The user you want to get info about {OPTIONAL}")),
    async execute(interaction) {
        var target = interaction.options.getUser("target");
        var user = target ? target : interaction.user;
        var date = user.createdAt;
        var month = dateToMTH(date.getUTCMonth());
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        var creationDate = `${month} ${day}, ${year}`;

        await user.fetch().then(person => {

            const embedUI = new MessageEmbed()
            .setTitle("User Info")
            .addFields({
                name: "Tag & House",
                value: `${user.tag} ${houseCheck(person)}`,
                inline: false
            }, {
                name: "ID",
                value: `${user.id}`,
                inline: false
            }, {
                name: "Discord Account Creation Date",
                value: `${creationDate}`,
                inline: false
            }, {
                name: "Banner Color",
                value: `${person.hexAccentColor ? person.hexAccentColor : "N/A"}`,
                inline: false
            }, {
                name: "Bot?",
                value: `${user.bot ? ":white_check_mark:" : ":x:"}`,
                inline: false
            }, {
                name: "Banner Image",
                value: "\u200B",
            })
            .setColor(`${person.hexAccentColor ? person.hexAccentColor : "#04ae70"}`)
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .setFooter(`Slash command executed by ${interaction.user.tag}`)
            .setImage(`${user.bannerURL({ dynamic: true, size: 2048 }) ? user.bannerURL({ dynamic: true, size: 2048 }) : "https://cdn.discordapp.com/attachments/837778991066775553/924504316881014834/Untitled520_20211225222850_remastered.png"}`)
            .setTimestamp();

            interaction.reply({ embeds: [embedUI] });
        });
        

        
    }
}