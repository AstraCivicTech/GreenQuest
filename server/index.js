///////////////////////////////
// Imports
///////////////////////////////
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const express = require("express");

// middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const checkAuthentication = require("./middleware/checkAuthentication");
const logRoutes = require("./middleware/logRoutes");
const logErrors = require("./middleware/logErrors");

// controller imports
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const aiControllers = require("./controllers/aiControllers");
const challengesControllers = require("./controllers/challengesControllers");
const postControllers = require("./controllers/postControllers");
// const postRoutes = require('./routes/postRoutes');

// Initialize and start the challenge scheduler
require("./scheduler/challengeScheduler");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // must match your frontend origin
    credentials: true, // allow cookies/auth headers
  })
);
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
///////////////////////////////

app.post("/api/auth/register", authControllers.registerUser);
app.post("/api/auth/login", authControllers.loginUser);
app.get("/api/auth/me", authControllers.showMe);
app.delete("/api/auth/logout", authControllers.logoutUser);

///////////////////////////////
// AI Routes
///////////////////////////////

app.get("/api/ai/generate", aiControllers.ai);
app.post("/api/ai/validate", aiControllers.ai); // revisit

///////////////////////////////
// User Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get("/api/users", checkAuthentication, userControllers.listUsers);
app.get("/api/users/:id", checkAuthentication, userControllers.showUser);
app.patch("/api/users/:id", checkAuthentication, userControllers.updateUser);
// routes for managing level info
app.get(
  "/api/users/level/:id",

  userControllers.getLevelInfo
);
app.patch(
  "/api/users/level/:id",

  userControllers.updateLevelInfo
);
// routes for managing challenges
app.get(
  "/api/challenges",
  checkAuthentication,
  challengesControllers.getChallenges
);
app.get(
  "/api/users/:id/completed-challenges",
  checkAuthentication,
  challengesControllers.getCompletedChallenges
);
app.post(
  "/api/challenges/complete",
  checkAuthentication,
  challengesControllers.completeChallenge
);
app.post("/api/challenges/create", challengesControllers.createChallenge);
// app.use('/api/posts', postRoutes);

// routes for managing posts.
app.get("/api/posts", postControllers.getAllPosts); // Get all the posts.
app.get("/api/post/:id", postControllers.getPostById); // Gets a post by the id.
app.post("/api/post", postControllers.createPost); // Creates a new post.
app.patch("/api/post/update/:id", postControllers.updatePost); // Updates an existing post.
app.delete("/api/post/delete/:id", postControllers.deletePost); // Deletes a an existing posts.

///////////////////////////////////
///////////////////////////////
// Fallback Routes
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(logErrors);

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
