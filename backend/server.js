const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();


// import all routes
const AIRoute = require("./Routes/AIRoute")





const app = express();
app.use(express.json());
app.use(cors());


app.use("/api", AIRoute);


app.listen(4000, (req, res) =>{
    console.log("server is running on 4000 port");
})