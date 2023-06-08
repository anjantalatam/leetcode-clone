const jwt = require("jsonwebtoken");
const { secret } = require("./utils");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(403).json({ msg: "Missing Auth Header" });
  }

  const decoded = jwt.verify(authHeader, secret);
  console.log("dd", decoded);

  if (decoded && decoded.id !== undefined) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({ msg: "Token invalid/expired" });
  }
};

module.exports = { auth };
