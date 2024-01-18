const auth = require("basic-auth");

const username = process.env.SERVER_AUTH_USERNAME ?? "defaultserver";
const password = process.env.SERVER_AUTH_PASSWORD ?? "gH4Baw28awWl";

function authenticateUser(req, res, next) {
  const user = auth(req);

  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", 'Basic realm="Authentication Required"');
    res.status(401);
    res.json({ message: "Auth failed!" });
    return;
  }

  if (user.name === username && user.pass === password) {
    next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="Authentication Required"');
    res.status(401);
    res.json({ message: "Auth failed!" });
    return;
  }
}

module.exports = authenticateUser;
