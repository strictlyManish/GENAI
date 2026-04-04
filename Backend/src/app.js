const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const InterviewRoute = require("./routes/interview.routes");
const path = require("path");

// Middlewares
app.use(express.json());
app.use(cookie_parser());
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRouter);
app.use("/api/interview", InterviewRoute);

// Serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route (must come last)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;