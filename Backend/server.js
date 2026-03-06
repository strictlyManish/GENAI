require("dotenv").config();
const app =  require("./src/app");
const connectDb = require("./src/config/db");
const GenrateInterviewReport = require("./src/service/ai.service");
const {jobDescription,resume,selfDescription} = require("./src/service/temp");



// connectDb();

GenrateInterviewReport({jobDescription,resume,selfDescription})

app.listen(3000,()=>{
    console.log('Server Runnig on port 3000')
});