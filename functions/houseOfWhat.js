const { UserFlags } = require('discord.js');

module.exports = function (User) {
    if (UserFlags.FLAGS.HOUSE_BRAVERY === User.flags.bitfield) {
        return "<:bravery:924822839276748800>";
    } else if (UserFlags.FLAGS.HOUSE_BRILLIANCE === User.flags.bitfield) {
        return "<:brilliance:924822819269922816>";
    } else if (UserFlags.FLAGS.HOUSE_BALANCE === User.flags.bitfield) {
        return "<:balance:924822802727575552>";
    } else {
        return "";
    }
}

/*

All the flags, and their bitfield:

{
  DISCORD_EMPLOYEE: 1,
  PARTNERED_SERVER_OWNER: 2,
  HYPESQUAD_EVENTS: 4,
  BUGHUNTER_LEVEL_1: 8,
  HOUSE_BRAVERY: 64,
  HOUSE_BRILLIANCE: 128,
  HOUSE_BALANCE: 256,
  EARLY_SUPPORTER: 512,
  TEAM_USER: 1024,
  BUGHUNTER_LEVEL_2: 16384,
  VERIFIED_BOT: 65536,
  EARLY_VERIFIED_BOT_DEVELOPER: 131072,
  DISCORD_CERTIFIED_MODERATOR: 262144,
  BOT_HTTP_INTERACTIONS: 524288
}

*/