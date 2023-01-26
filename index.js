const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Data = require("./models/data");
const e = require("express");

//Connect to mongo database
mongoose
  .connect(
    "mongodb+srv://admin:2bBnndPwN9EXc5X0@sasp.4d75jje.mongodb.net/Police",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/users/getIgn.js")(app);
require("./routes/users/users.js")(app);

app.post("/users/create", (req, res) => {
  const data = new Data({
    id: req.body.id,
    playtime: req.body.playtime,
  });
  if (data) {
    const player = mongoose.model("Data");

    player.find({ id: req.body.id }, function (errs, result) {
      if (errs) return next(errs);

      if (result.length == 0) {
        data.save();
        res.send("User had been created!");
      } else {
        res.send("User is already here!");
      }
    });
  }
});

app.post("/users/delete", (req, res) => {
  const data = new Data({
    id: req.body.id,
    playtime: req.body.playtime,
  });
  if (data) {
    const player = mongoose.model("Data");

    player.find({ id: req.body.id }, function (errs, result) {
      if (errs) return next(errs);

      if (result.length == 0) {
        res.send("We have not found a user!");
      } else {
        player.deleteOne({ id: req.body.id }, function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send("deleted");
          }
        });
      }
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`);
});
