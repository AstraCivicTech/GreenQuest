const cookieSession = require("cookie-session");

const handleCookieSessions = cookieSession({
  name: "session", // this creates a req.session property holding the cookie
  secret: process.env.SESSION_SECRET, // this secret is used to hash the cookie
  sameSite: "lax", // this is the default value
  secure: false, // set to true if using https
  httpOnly: true, // prevents client-side JavaScript from accessing the cookie
});

module.exports = handleCookieSessions;
