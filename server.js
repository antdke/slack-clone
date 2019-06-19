const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const app = express();

// Chatkit object w/ credentials
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:045710a6-b082-449a-ac03-edbe8977ff10",
  key:
    "9961b097-30bb-4d51-8f7b-ba258fc0cd32:A4n4vli2JN6Lo3AbyvYcp1NYFnfnJlSFR+kUcwqc7YU="
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// For user creating a username
app.post("/users", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
