const User = require("../../model/users/UsersModel");

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      role,
    } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new Error("Email is Already Registered");

    if (password !== confirmPassword)
      throw new Error("password does not match");

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      role,
    });

    // Save user to the database
    await user.save();

    res
      .status(201)
      .json({
        status: "success",
        data: user,
        message: "User Created sucessfull",
      });
  } catch (error) {
    // Handle errors
    res.status(400).json({ status: "error", data: error.message });
  }
};
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let result = await User.comparePassword(email, password);
      const { token } = await User.generateAuthToken(result?._id);
  
      res.status(200).send({
        status: "success",
        data: {
          token: token,
          result,
        },
      });
    } catch (error) {
      res.status(500).send({ status: "error", data: error.toString() });
    }
  };

  const getAllUser = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 5;
  
      const user = await User.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('-password');;
        const totalUsers = await User.countDocuments();
  
      const totalPages = Math.ceil(totalUsers / pageSize);
  
      res.status(200).send({
        status: "success",
        data: user,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      res.status(500).send({ status: "error", data: error.toString() });
    }
  };

module.exports = {
  createUser,
  login,
  getAllUser
};