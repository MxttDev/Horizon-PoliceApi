const e = require("express");
let mongoose = require("mongoose");

const Data = mongoose.model("Data");

module.exports = function (app) {
  app.get("/users/:id", (req, res) => {
    Data.find({ ign: req.params.ign }, "-_id")
      .sort()
      .limit(1)
      .exec(function (err, users) {
        var user = users[0];

        if (err) return res.json({ error: true });

        if (user) {
          res.send(user);
        } else {
          res.json({ notFound: true });
        }
      });
  });
};
