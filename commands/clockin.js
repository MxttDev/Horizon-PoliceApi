const { SlashCommandBuilder } = require("discord.js");

const createEmbed = require("../Functions/createEmbed.js");
const userData = require("../Functions/userData").userPlaytime;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clockin")
    .setDescription("Clock in duty!"),
  async execute(interaction) {
    let embed = createEmbed(`Starting your Tour of Duty!`);
    interaction.reply({ embeds: [embed], ephemeral: true });

    userData.set(interaction.member.id, Date.now());
    var user = userData.get(interaction.member.id);

    setTimeout(() => interaction.deleteReply(), 5000);
  },
};
