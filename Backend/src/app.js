const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const InterviewRoute = require("./routes/interview.routes");

// Middlewares
app.use(express.json());
app.use(cookie_parser());
app.use(express.static("public"));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);


//API
app.use("/api/auth", authRouter);
app.use("/api/interview", InterviewRoute);




module.exports = app;