require("dotenv").config();
const app =  require("./src/app");
const connectDb = require("./src/config/db");
const GenrateInterviewReport = require("./src/service/ai.service");
const {resume,jobDescription,selfDescription} = require("./src/service/temp");




GenrateInterviewReport({resume,selfDescription,jobDescription})
// connectDb();
app.listen(3000,()=>{
    console.log('Server Runnig on port 3000')
});