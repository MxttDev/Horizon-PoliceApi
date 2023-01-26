const axios = require("axios");

module.exports = function appendUser(Url, id, amount) {
  axios
    .post(Url, {
      id: id,
      playtime: amount,
    })
    .then(function (response) {
      console.log(response);
    });
};
