require("dotenv").config();
const app =  require("./src/app");
const connectDb = require("./src/config/db");
const {generateInterviewReport} = require("./src/service/ai.service");
const {resume,jobDescription,selfDescription} = require("./src/service/temp");

// connectDb();

generateInterviewReport({resume,jobDescription,selfDescription})

app.listen(3000,()=>{
    console.log('Server Runnig on port 3000')
});