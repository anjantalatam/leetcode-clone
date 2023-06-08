const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
const { secret } = require("./utils");

const app = express();

const port = 3000;
let USER_COUNT_ID = 0;

const USERS = [{ email: "anjan@gmail.com", password: "anjan", id: 0 }];

// use cors
app.use(cors());

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Server up");
});

app.get("/me", auth, (req, res) => {
  const id = req.userId;

  const user = USERS.filter((user) => user.id === id);

  return res.json({ email: user.email, id: user.password });
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
  const { body } = req;

  console.log(body);

  if (!body.email || !body.password) {
    return res.status(400).json({ msg: "Email and Password are required" });
  }

  const user = USERS.find((user) => user.email === body.email);

  if (!user || user.password !== body.password) {
    return res.status(404).send({ msg: "Incorrect email or password" });
  }

  const token = jwt.sign({ id: USER_COUNT_ID }, secret);

  return res.status(200).send({ token });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
