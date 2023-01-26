const axios = require("axios");

module.exports = function deleteUser(Url, id, amount) {
  axios
    .post(Url, {
      id: id,
      playtime: amount,
    })
    .then(function (response) {
      console.log(response);
    });
};
