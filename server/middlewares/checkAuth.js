const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) res.sendStatus(401);
  const [type, token] = authHeader.split(/\s+/);
  if (type !== "Bearer") res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    req.userId = payload.sub;
    next();
  } catch (e) {
    res.sendStatus(401);
    console.error(e);
  }
};