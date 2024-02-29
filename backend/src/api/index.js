const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", require("./users"));
app.use("/api", require("./classes"));
app.use("/api", require("./requests"));
app.use("/api", require("./absences"));
app.use("/api", require("./subjects"));
app.use("/api", require("./schedules"));
app.use("/api", require("./teachers"));
app.use("/api", require("./students"));
app.use("/api", require("./parents"));
app.use("/api", require("./messages"));
app.use("/api", require("./email"));

module.exports = app;
