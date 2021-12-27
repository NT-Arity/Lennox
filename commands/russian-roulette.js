const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("russian-roulette")
        .setDescription("Starts a game of russian roulette."),
    async execute(interaction) {
        const row = new MessageActionRow().addComponents(new MessageButton().setCustomId("yes").setLabel("Yes").setStyle("PRIMARY"), new MessageButton().setCustomId("no").setLabel("No").setStyle("DANGER"));
        const filter = i => (i.customId === "yes" || i.customId === "no") && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });

        // Embeds
        const embedRRS = new MessageEmbed()
        .setAuthor({ name: "Russian Roulette", iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
        .setDescription("Feeling lucky? You have a 16.67% chance of death.\n\nClick \"Yes\" to start and \"No\" to cancel.")
        .setColor("GREY")
        .setImage("https://images.genius.com/16f606d26f368ed895bbdc4fabbfeeb7.1000x601x1.jpg")
        .setFooter(`Slash command executed by ${interaction.user.tag}`);

        const embedRRM = new MessageEmbed()
        .setAuthor({ name: "Spinning...", iconURL: "https://commonlook.com/wp-content/uploads/2019/05/spinner-1.gif" })
        .setDescription("Please wait while the cylinder is spinning...")
        .setColor("GREY")
        .setImage("https://i.imgur.com/aCcPPPe.gif")
        .setFooter(`Slash command executed by ${interaction.user.tag}`);

        const embedRRE1 = new MessageEmbed()
        .setAuthor({ name: "You lived!", iconURL: "https://twemoji.maxcdn.com/v/latest/72x72/1f44d.png" })
        .setDescription("Congrats! You've survived russian roulette.")
        .setColor("GREEN")
        .setImage("https://i.pinimg.com/474x/67/a5/3b/67a53b09649a646bcb02e6d2de75d6a5.jpg")
        .setFooter(`Slash command executed by ${interaction.user.tag}`);

        const embedRRE2 = new MessageEmbed()
        .setAuthor({ name: "You died!", iconURL: "https://twemoji.maxcdn.com/v/latest/72x72/1f44e.png" })
        .setDescription("That sucks, you've just died.")
        .setColor("DARK_RED")
        .setImage("https://i.pinimg.com/originals/ea/87/cf/ea87cfbd6b50bff9e4b903e66014373b.gif")
        .setFooter(`Slash command executed by ${interaction.user.tag}`);

        await interaction.reply({ embeds: [embedRRS], components: [row] });

        collector.on("collect", async i => {
            if (i.customId === "yes") {
                let faith = [embedRRE2, embedRRE1, embedRRE1, embedRRE1, embedRRE1, embedRRE1][Math.floor(Math.random() * 5)];
                await i.deferUpdate();
                await i.editReply({ embeds: [embedRRM], components: [] });
                await wait(3000);
                await i.editReply({ embeds: [faith] });
            } else if (i.customId === "no") {
                await i.deferUpdate();
                await i.editReply({ content: "Action cancelled!", embeds: [], components: [] });
            }
        });
    }
}