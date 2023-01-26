const { EmbedBuilder } = require("discord.js");

module.exports = function createEmbed(sub) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("San Andreas State Police Database")
    .setDescription(sub)
    .setTimestamp();

  return embed;
};
