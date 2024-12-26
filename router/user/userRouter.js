const express = require("express");
const { createUser, login, getAllUser, updateProfile } = require("../../controller/user/userController");




const userRouter = express.Router();

userRouter.post("/create",  createUser);
userRouter.post("/login",  login);
userRouter.get("/alluser",  getAllUser);
userRouter.put("/profile/:id",  updateProfile);

module.exports = userRouter;
