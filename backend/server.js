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

const port = process.env.PORT ||4001;

app.listen(port, (req, res) =>{
    console.log("server is running on 4001 port");
    res.send("Server is running on 4001 port");
})
