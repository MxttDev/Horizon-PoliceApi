const axios = require("axios");

module.exports = function getUser(Url) {
  axios.get(Url).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};
