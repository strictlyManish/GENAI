const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const cookie_parser = require("cookie-parser");


// Middlewares
app.use(express.json());
app.use(cookie_parser());

//API
app.use("/api/auth",authRouter);
app.use("/api",authRouter);



module.exports = app;