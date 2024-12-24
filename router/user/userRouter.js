const express = require("express");
const { createUser, login, getAllUser } = require("../../controller/user/Usercontroller");




const userRouter = express.Router();

userRouter.post("/create",  createUser);
userRouter.post("/login",  login);
userRouter.get("/alluser",  getAllUser);

module.exports = userRouter;
