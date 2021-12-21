# IMPORTANT: PLEASE READ

Every command is held in the commands file. If you want to add a command, please add a file inside the commands folder, and have the name 
of the command as the file (Example: a ping command would have a file name of ping.js). No errors will occur if you don't, but it makes it
easier to hunt down the command file and make changes to it.

Each command must be set up like this:

```js    
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Name here")
        .setDescription("Description here"),
    async execute(interaction) {
        // Code here
    }
}
```

If it isn't set up like this, an error will occur, and the bot won't function properly
    
Make sure that:
  - No two command files have the same name
  - Whenever you're done with adding in your information for a key, you add a comma at the end (Errors will occur if you don't)
  - You put semi-colons at the end of your code (Good Practice)
  - Each file name is the name of a command (Again, so it's easier to track down and edit)
   
If you have questions, please DM Nintendo.
