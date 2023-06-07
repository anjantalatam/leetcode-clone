const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
let USER_COUNT_ID = 0;

const USERS = [];

// use cors
app.use(cors());

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.post("/signup", (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return res.status(400).json({ msg: "Email and Password are required" });
  }

  if (USERS.findIndex((user) => user.email === body.email) > -1) {
    return res.status(403).json({ msg: "User Already exists" });
  }

  USERS.push({
    email: body.email,
    password: body.password,
    id: USER_COUNT_ID++,
  });

  return res.json({ msg: "User Created" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
