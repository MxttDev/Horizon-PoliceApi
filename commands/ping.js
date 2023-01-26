const { SlashCommandBuilder } = require("discord.js");

const createEmbed = require("../Functions/createEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let embed = createEmbed("Bop");
  },
};
