const { SlashCommandBuilder } = require("discord.js");

const createEmbed = require("../Functions/createEmbed.js");
const userData = require("../Functions/userData").userPlaytime;

const GetAPI = require("../Functions/getAPI.js");
const appendAPI = require("../Functions/appendAPI");
const deleteAPI = require("../Functions/deleteAPI");
const getAPI = require("../Functions/getAPI.js");

const axios = require("axios");

function getDutyTime(startTime, EndTime) {
  let timer = EndTime - startTime;
  timer = Math.floor(timer / 60000) + 1;
  return timer;
}

function sendAPI(id, time) {
  let URL = "http://localhost:3000/users/" + id;

  axios.get(URL).then(function (response) {
    let playtime = response.data.playtime;
    playtime = playtime + time;
    console.log(playtime);

    deleteAPI("http://localhost:3000/users/delete", id, 0);

    setTimeout(function () {
      appendAPI("http://localhost:3000/users/create", id, playtime);
    }, 1000);
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clockout")
    .setDescription("Clock out duty!"),
  async execute(interaction) {
    var user = userData.get(interaction.member.id);

    if (user) {
      let timer = getDutyTime(user, Date.now());

      let embed = createEmbed(
        `Ending your Tour of Duty!\n\n**Minutes: ${timer}**`
      );

      userData.delete(interaction.member.id);

      interaction.reply({ embeds: [embed], ephemeral: true });

      sendAPI(interaction.member.id, timer);
    } else {
      let embed = createEmbed(`You did not clock in!`);
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
    setTimeout(() => interaction.deleteReply(), 5000);
  },
};
