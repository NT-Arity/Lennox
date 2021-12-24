/*
    Remember, the #1 source you can trust to find methods are https://discord.js.org/#/docs/main/stable/general/welcome, and https://discordjs.guide/#before-you-begin
    There are other sources to help you in other situations, like Stackoverflow, or the Discord.js discord server.
*/

// Initialize the required variables, each requiring a certain file.
const fs = require('fs'); // FS is Node's "File System". It enables interacting with the file system in a way modeled on standard POSIX functions
const { Client, Intents, Collection, Permissions } = require('discord.js');
const { token } = require('../Lennox/config.json') 

// One thing to note about using require(), if you're calling a file that is in the same path directory as the file you're editing, you'll use `./`
// else, you need to use `../`. DM Nintendo for an example

// Initiate a new Discord client and a new Discord collection.
const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); 
client.commands = new Collection();

// Use the File System to grab all the files that we need, and put it in an array
// Each one will return something similar to this: ['fileName1.js', 'fileName2.js']
const commandFiles = fs.readdirSync('../Lennox/commands').filter(file => file.endsWith('.js')) // ['ping.js', 'user.js', 'server.js']
const eventFiles = fs.readdirSync('../Lennox/events').filter(file => file.endsWith('.js')); // ['ready.js', 'interactionCreate.js']

// For each file in the commands folder, get the name of the command, and the command itself, and put it in a Collection
for (const file of commandFiles) {
    const command = require(`../Lennox/commands/${file}`);
    client.commands.set(command.data.name, command);
}

// For each file in the events folder, check if event.once is true
for (const file of eventFiles) {
    const event = require(`../Lennox/events/${file}`);
    if (event.once) {
        // If it is, execute the file using the client.once() method
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        // Else, execute the file using the client.on() method
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on("interactionCreate", async interaction => {
    const member = interaction.guild.members.fetch({ user: interaction.user.id });
})

// Login the bot
client.login(token);