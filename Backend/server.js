const app = require("./src/app");
const connectToDB = require("./src/config/database");
require('dotenv').config()

app.listen(process.env.PORT,()=>{
    console.log(`server is running the port number is ${process.env.PORT}`);
    connectToDB()
})