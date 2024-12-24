require("dotenv").config();
const express = require("express");
const {connectDB} = require("./database/mongoose");



const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const userRouter = require("./router/user/UserRouter");


connectDB();

const app = express();

app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);



app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})
