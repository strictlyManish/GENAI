const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");

app.use(express.json());


//API
app.use("/api/auth",authRouter);
app.use("/api",authRouter);



module.exports = app;