const User = require("../models/User");

exports.registerUser = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Username, password, email, and zipcode required" });
  }

  console.log("Register Body:", req.body);

  const { email, username, password, zipcode } = req.body;
  if (!email || !username || !password || !zipcode) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const user = await User.create(email, username, password, zipcode); // 🔥 fixed order!

  if (!user || user.success === false) {
    return res.status(400).send({
      message: user.message || "Registration failed.",
      ...(user.detail && { detail: user.detail }),
    });
  }

  req.session.userId = user.id;
  res.status(201).send({
    id: user.id,
    username: user.username,
  });
};

exports.loginUser = async (req, res) => {
  // Request needs a body
  if (!req.body) {
    return res.status(400).send({ message: "Username and password required" });
  }

  // Body needs a username and password
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "Username and password required" });
  }

  // Username must be valid
  const user = await User.findByUsername(username);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  // Password must match
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  // Add the user id to the cookie and send the user data back
  req.session.userId = user.id;
  res.send(user);
};

exports.showMe = async (req, res) => {
  // no cookie with an id => Not authenticated.
  if (!req.session.userId) {
    return res.status(401).send({ message: "User must be authenticated." });
  }

  // cookie with an id => here's your user info!
  const user = await User.find(req.session.userId);
  res.send(user);
};

exports.logoutUser = (req, res) => {
  req.session = null; // "erase" the cookie
  res.status(204).send({ message: "User logged out." });
};
