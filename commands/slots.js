const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const isWinner = require("../functions/isWinner");
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slots")
        .setDescription("Starts a game of slots"),
    async execute(interaction) {
        const buttons = new MessageActionRow().addComponents(new MessageButton().setCustomId("yes").setLabel("Spin the reels").setStyle("PRIMARY"), new MessageButton().setCustomId("no").setLabel("Walk away").setStyle("DANGER"));
        const filter = i => (i.customId === "yes" || i.customId === "no") && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });
        const emojiDecider = () => {
            return ["💲", "💣", "💰", "❌", "✔", "🍋", "🍒", "🍎", "🍏", "🍈"][Math.floor(Math.random() * 9)];
        }

        let reel1 = emojiDecider();
        let reel2 = emojiDecider();
        let reel3 = emojiDecider();

        let decider = isWinner(reel1, reel2, reel3);

        const embedSS = new MessageEmbed()
        .setTitle("Jackpot")
        .setDescription("❓ | ❓ | ❓")
        .setColor("DARK_BUT_NOT_BLACK");

        const embedSM = new MessageEmbed()
        .setTitle("Jackpot")
        .setDescription("🔁 | 🔁 | 🔁")
        .setColor("DARK_BUT_NOT_BLACK");

        const embedSE = new MessageEmbed()
        .setTitle(`You ${decider}!`)
        .setDescription(`${reel1} | ${reel2} | ${reel3}`)
        .setColor(`${decider === "Win" ? "GREEN" : "RED"}`);

        await interaction.reply({ embeds: [embedSS], components: [buttons] })

        collector.on("collect", async i => {
            if (i.customId === "yes") {
                await i.deferUpdate();
                await i.editReply({ embeds: [embedSM], components: [] });
                await wait(5000);
                await i.editReply({ embeds: [embedSE] });
            } else if (i.customId === "no") {
                await i.deferUpdate();
                await i.editReply({ content: "You decided to not gamble your money and walked away.", components: [] });
            }
        })
    }
}